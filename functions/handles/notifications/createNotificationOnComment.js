const { db } = require("../admin-db");

exports.createNotificationOnComment = (req, res) => {
  let screamData = {};

  db.doc(`/Screams/${req.params.screamId}`)
    .get()
    .then((scream) => {
      if (scream.exists) {
        return (screamData = scream.data());
      }

      return res.status(404).json({ message: "Scream not found" });
    })
    .then(() => {
      return db.collection("Notifications").add({
        screamId: req.params.screamId,
        sender: req.user.handle,
        recipient: screamData.userHandle,
        createdAt: new Date().toISOString(),
        type: "comment",
        read: false,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
