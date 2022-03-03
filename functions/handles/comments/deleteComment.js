const { db } = require("../admin-db");

exports.deleteComment = (req, res) => {
  const document = db.doc(`/Comments/${req.params.commentId}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "Comment not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      return document.delete();
    })
    .then(() => {
      return res
        .status(200)
        .json({ message: `delete ${req.params.commentId} successfully` });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
