const { db } = require("../admin-db");

// get all data except scream data
exports.getDataOfUser = (req, res) => {
  let userData = {};

  const likeDoc = db
    .collection("Likes")
    .where("userHandle", "==", req.user.handle)
    .get();

  const notiDoc = db
    .collection("Notifications")
    .where("recipient", "==", req.user.handle)
    .orderBy("createdAt", "desc")
    .get();

  db.doc(`/Users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return likeDoc;
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return notiDoc;
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          notificationId: doc.id,
          screamId: doc.data().screamId,
          sender: doc.data().sender,
          recipient: doc.data().recipient,
          createdAt: doc.data().createdAt,
          type: doc.data().type,
          read: doc.data().read,
        });
      });

      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
