const { db } = require("../admin-db");

exports.deleteNotification = (req, res) => {
  const likeDocument = db
    .collection("Notifications")
    .where("screamId", "==", req.params.screamId)
    .where("sender", "==", req.user.handle)
    .limit(1)
    .get();

  db.doc(`Screams/${req.params.screamId}`)
    .get()
    .then(() => {
      return likeDocument;
    })
    .then((data) => {
      db.doc(`/Notifications/${data.docs[0].id}`).delete();
    })
    .catch((err) => {
      console.log(err);
    });
};
