const firebase = require("firebase");
const { validateSignIn } = require("./validate/validation");

exports.signIn = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateSignIn(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        err.code = "wrong password";
      } else if (err.code === "auth/user-not-found") {
        err.code = "user not found";
      }
      return res.status(403).json({ error: err.code + ", please try again" });
    });
};
