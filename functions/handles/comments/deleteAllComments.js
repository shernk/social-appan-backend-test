const { db } = require("../admin-db");
const { deleteAll } = require("../../deletes/deleteAll");

exports.deleteAllComments = (req, res) => {
  const ref = db.collection("Comments");

  deleteAll(ref, res);
};
