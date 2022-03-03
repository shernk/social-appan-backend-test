const { db } = require("../admin-db");

exports.getAllComments = (req, res) => {
  db.collection("Comments")
    .get()
    .then((data) => {
      if (data === null) {
        return res.status(404).json({ message: "Do not have any comments" });
      }
      let comments = [];
      data.forEach((comment) => {
        if (comment === null) {
          return res.status(404).json({ message: "Do not have any comment" });
        }
        
        comments.push({
          commentId: comment.id,
          screamId: comment.data().screamId,
          userId: comment.data().userId,
          body: comment.data().body,
          userHandle: comment.data().userHandle,
          likeCommentCount: comment.data().likeCommentCount,
          replyCommentCount: comment.data().replyCommentCount,
          createdAt: comment.data().createdAt,
        });
      });
      return res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
