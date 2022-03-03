const { db } = require("../admin-db");

exports.createNotificationOnLike = (req, res) => {
  let screamData = {};

  db.doc(`/Screams/${req.params.screamId}`)
    .get()
    .then((scream) => {
      if (scream.exists) {
        return (screamData = scream.data());
      } else {
        return res.status(404).json({ message: "Scream not found" });
      }
    })
    .then(() => {
      db.collection("Notifications").add({
        screamId: req.params.screamId,
        sender: req.user.handle,
        recipient: screamData.userHandle,
        createdAt: new Date().toISOString(),
        type: "like",
        read: false,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
