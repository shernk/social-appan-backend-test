const { db } = require("../admin-db");
const { deleteAll } = require("../../deletes/deleteAll");

exports.deleteAllLikes = (req, res) => {
  const ref = db.collection("Likes");

  deleteAll(ref, res);
};
