const { db } = require("../admin-db");

// get each user info and their scream
exports.getUserOwnDetailWithScream = (req, res) => {
  let userData = {};

  const screamDoc = db
    .collection("Screams")
    .where("userHandle", "==", req.params.handle)
    .orderBy("createdAt", "desc")
    .get();

  db.doc(`/Users/${req.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return screamDoc;
      } else {
        return res.status(404).json({ errror: "User not found" });
      }
    })
    .then((data) => {
      userData.screams = [];
      data.forEach((doc) => {
        userData.screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
          likeScreamCount: doc.data().likeScreamCount,
          commentScreamCount: doc.data().commentScreamCount,
        });
      });
      return res.json(userData);
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
