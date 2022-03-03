const { db } = require("../admin-db");

exports.getComment = (req, res) => {
  let commentData = {};

  db.doc(`/Comments/${req.params.commentId}`)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return res.status(404).json({ message: "comment not found" });
      commentData = doc.data();
      commentData.commentId = doc.id;
      return db
        .collection("Comments")
        .orderBy("createdAt", "desc")
        .where("commentId", "==", req.params.commentId)
        .get();
    })
    .then((data) => {
      commentData.comments = [];
      data.forEach((doc) => {
        commentData.comments.push(doc.data());
      });
      return res.status(200).json(commentData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
