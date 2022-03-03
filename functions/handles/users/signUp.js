const { db } = require("../admin-db");
const { validateSignUp } = require("./validate/validation");
const firebaseConfig = require("../../config");
const firebase = require("firebase");

exports.signUp = (req, res) => {
  const newUser = {
    email: req.body.email,
    // make strong password default by firebase
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
    createAt: new Date().toISOString(),
  };

  const noImg = "no-img.png";
  let token, userId;

  const { errors, valid } = validateSignUp(newUser);
  if (!valid) return res.status(400).json(errors);

  const dbDoc = db.doc(`/Users/${newUser.handle}`);
  dbDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      console.log('signup');
      console.log(data.user);
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredential = {
        userId,
        email: newUser.email,
        handle: newUser.handle,
        //TODO Append token to imageUrl.
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        createAt: new Date().toISOString(),
      };

      return dbDoc.set(userCredential);
    })
    .then(() => {
      res.status(201).json({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({
          error: err.code + " - something went wrong, please try again",
        });
      }
    });
};
