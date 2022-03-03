const { db } = require("../admin-db");
const {
  createNotificationOnComment,
} = require("../notifications/createNotificationOnComment");

exports.commentOnScream = (req, res) => {
  if (req.body.body === ("" || undefined)) {
    return res.status(400).json({ comment: "Must not be empty" });
  }

  const newComment = {
    screamId: req.params.screamId,
    body: req.body.body,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
    replyCommentCount: 0,
    likeCommentCount: 0,
    createdAt: new Date().toISOString(),
  };

  const scream = db.doc(`Screams/${req.params.screamId}`);

  scream
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }

      let commentScreamCount = doc.data().commentScreamCount;

      if (newComment.body) {
        commentScreamCount = ++doc.data().commentScreamCount;
      }

      return scream.update({
        commentScreamCount: commentScreamCount,
      });
    })
    .then(() => {
      createNotificationOnComment(req, res);

      return db.collection("Comments").add(newComment);
    })
    .then(() => {
      return res.json(newComment);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ error: err });
    });
};
