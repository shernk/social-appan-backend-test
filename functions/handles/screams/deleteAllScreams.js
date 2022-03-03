const { db } = require("../admin-db");
const { deleteAll } = require("../../deletes/deleteAll");

exports.deleteAllScreams = (req, res) => {
  const ref = db.collection("Screams");

  deleteAll(ref, res);
};
