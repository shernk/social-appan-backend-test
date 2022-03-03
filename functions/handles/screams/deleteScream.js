const { db } = require("../admin-db");
const { getAllScreams } = require("./getAllScream");

exports.deleteScream = (req, res) => {
  const ScreamDocument = db.doc(`Screams/${req.params.screamId}`);

  const likesDocument = db
    .collection("Likes")
    .where("screamId", "==", req.params.screamId)
    .get();

  const commentsDocument = db
    .collection("Comments")
    .where("screamId", "==", req.params.screamId)
    .get();

  const notificationsDocument = db
    .collection("Notifications")
    .where("screamId", "==", req.params.screamId)
    .get();

  const batch = db.batch();

  ScreamDocument.get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "Scream not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      }
    })
    // deleted scream
    .then((data) => {
      ScreamDocument.delete();

      return commentsDocument;
    })
    // deleted comment
    .then((data) => {
      data.forEach((doc) => {
        batch.delete(db.doc(`/Comments/${doc.id}`));
      });

      return likesDocument;
    })
    // deleted like
    .then((data) => {
      data.forEach((doc) => {
        batch.delete(db.doc(`/Likes/${doc.id}`));
      });

      return notificationsDocument;
    })
    // deleted notification
    .then((data) => {
      data.forEach((doc) => {
        batch.delete(db.doc(`/Notifications/${doc.id}`));
      });

      return batch.commit();
    })
    .then(() => {
      return getAllScreams(req, res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
