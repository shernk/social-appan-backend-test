const { db } = require("../admin-db");

exports.getAllScreams = (req, res) => {
  db.collection("Screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((scream) => {
        screams.push({
          screamId: scream.id,
          body: scream.data().body,
          userHandle: scream.data().userHandle,
          createdAt: scream.data().createdAt,
          userImageUrl: scream.data().userImageUrl,
          likeScreamCount: scream.data().likeScreamCount,
          commentScreamCount: scream.data().commentScreamCount,
        });
      });
      return res.json(screams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
