const { db } = require("../admin-db");

exports.getAllUserInfo = (req, res) => {
  db.collection("Users")
    .orderBy("createAt", "desc")
    .get()
    .then((data) => {
      let users = [];
      data.forEach((doc) => {
        users.push({
          userId: doc.id,
          email: doc.data().email,
          imageUrl: doc.data().imageUrl,
          bio: doc.data().bio,
          website: doc.data().website,
          location: doc.data().location,
          handle: doc.data().handle,
          createdAt: doc.data().createAt,
        });
      });
      return users !== []
        ? res.json(users)
        : res.json({ message: "No document" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.code });
    });
};
