const { db } = require("../admin-db");

exports.deleteLikeOfScream = (ref, res) => {
  const document = db.doc(`Screams/${req.params.screamId}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "Scream not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      return document.delete();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
