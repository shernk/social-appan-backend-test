const express = require("express");
const router = express.Router();

// controller
const { getAllComments } = require("../../handles/comments/getAllComments");
const { getComment } = require("../../handles/comments/getComment");
const { replyOnComment } = require("../../handles/comments/replyOnComment");
const {
  deleteAllComments,
} = require("../../handles/comments/deleteAllComments");
const { deleteComment } = require("../../handles/comments/deleteComment");

// Auth
const fbAuth = require("../../util/fbAuth");

// get
router.get("/comments", getAllComments);
router.get("/comment/:commentId", fbAuth, getComment);

// post
router.post("/comment/:commentId", fbAuth, replyOnComment);

// delete
router.delete("/comments", fbAuth, deleteAllComments);
router.delete("/comment/:commentId", fbAuth, deleteComment);

module.exports = router;
