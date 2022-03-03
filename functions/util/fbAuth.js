const { admin, db } = require("../handles/admin-db");

module.exports = (req, res, next) => {
  let idToken;
  const authHeaders = req.headers.authorization;
  const Bearer = "Bearer ";

  if (authHeaders && authHeaders.startsWith(Bearer)) {
    idToken = authHeaders.split(Bearer)[1];
  } else {
    console.error("No Token Found");
    return res.status(403).json({ error: "No Token Found" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.user = decodedToken;
      return db
        .collection("Users")
        .where("userId", "==", req.user.uid)
        .limit(1)
        .get();
    })
    .then((data) => {
      const datameta = data.docs[0].data();
      req.user.handle = datameta.handle;
      req.user.imageUrl = datameta.imageUrl;
      req.user.userId = datameta.userId;
      return next();
    })
    .catch((err) => {
      console.error("Error while verifying token,", err);
      return res.status(403).json(err);
    });
};
