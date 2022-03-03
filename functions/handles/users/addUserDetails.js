const { db } = require("../admin-db");
const { reduceUserDetails } = require("./validate/validation");

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/Users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.status(200).json({ message: "Info added successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ error: err.code });
    });
};
