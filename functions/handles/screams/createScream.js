const { db } = require("../admin-db");

exports.createScream = (req, res) => {
  if (!(req.body.body || "").trim()) {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    userImageUrl: req.user.imageUrl,
    likeScreamCount: 0,
    commentScreamCount: 0,
    createdAt: new Date().toISOString(),
  };

  db.collection("Screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      res.json(resScream);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};
