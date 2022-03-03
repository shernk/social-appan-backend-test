const { db } = require("../admin-db");

exports.getScreamWithLike = (req, res) => {
  let screamData = {};

  const likeDoc = db
    .collection("Likes")
    .orderBy("createdAt", "desc")
    .where("screamId", "==", req.params.screamId)
    .get();

  db.doc(`/Screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ message: "scream not found" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;

      return likeDoc;
    })
    .then((data) => {
      screamData.likes = [];
      data.forEach((doc) => {
        screamData.likes.push(doc.data());
      });

      return res.status(200).json(screamData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
