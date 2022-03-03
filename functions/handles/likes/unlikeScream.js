const { db } = require("../admin-db");
const {
  deleteNotification,
} = require("../notifications/deleteNotificationOnLike");

exports.unlikeScream = (req, res) => {
  let screamData;

  const likeDocument = db
    .collection("Likes")
    .where("screamId", "==", req.params.screamId)
    .where("userHandle", "==", req.user.handle)
    .limit(1)
    .get();

  const screamDocument = db.doc(`Screams/${req.params.screamId}`);

  screamDocument
    .get()
    .then((doc) => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;

        return likeDocument;
      } else {
        return res.status(404).json({ message: "Scream not found" });
      }
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ message: "Scream haven't like" });
      } else {
        return db
          .doc(`/Likes/${data.docs[0].id}`)
          .delete()
          .then(() => {
            let likedScreamCount = screamData.likeScreamCount;

            if (
              screamData.likeScreamCount === null ||
              screamData.likeScreamCount === NaN ||
              screamData.likeScreamCount <= 0
            ) {
              likedScreamCount = 0;

              return screamDocument.update({
                likeScreamCount: likedScreamCount,
              });
            }

            likedScreamCount = --screamData.likeScreamCount;

            return screamDocument.update({
              likeScreamCount: likedScreamCount,
            });
          })
          .then(() => {
            deleteNotification(req, res);
            return res.status(200).json(screamData);
          });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ erorr: err.code });
    });
};
