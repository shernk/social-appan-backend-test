const functions = require("firebase-functions");
const fbAuth = require("./util/fbAuth");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// upload image
app.set("view engine", "ejs");

// deploy
app.use(express.static("public"));

// firebase
const firebaseConfig = require("./config");
const firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

// Screams
const { getAllScreams } = require("./handles/screams/getAllScream");
const {
  getScreamWithComment,
} = require("./handles/screams/getScreamWithComment");
const { getScreamWithLike } = require("./handles/screams/getScreamWithLike");
const { createScream } = require("./handles/screams/createScream");
const { commentOnScream } = require("./handles/comments/commentOnScream");
const { deleteScream } = require("./handles/screams/deleteScream");
const { likeScream } = require("./handles/likes/likeScream");
const { unlikeScream } = require("./handles/likes/unlikeScream");
const { deleteAllScreams } = require("./handles/screams/deleteAllScreams");

// Users
const { signUp } = require("./handles/users/signUp");
const { signIn } = require("./handles/users/signIn");
const { getAllUserInfo } = require("./handles/users/getAllUserInfo");
// const { uploadImage } = require("./handles/users/uploadImage");
// const { upload } = require("./handles/users/upload");
const { addUserDetails } = require("./handles/users/addUserDetails");
const {
  getUserOwnDetailWithScream,
} = require("./handles/users/getUserOwnDetailWithScream");
const { getDataOfUser } = require("./handles/users/getDataOfUser");

// Comments
const { getAllComments } = require("./handles/comments/getAllComments");
const { getComment } = require("./handles/comments/getComment");
const { replyOnComment } = require("./handles/comments/replyOnComment");
const { deleteAllComments } = require("./handles/comments/deleteAllComments");
const { deleteComment } = require("./handles/comments/deleteComment");

// Likes
const { deleteAllLikes } = require("./handles/likes/deleteAllLikes");

//------------------------------------------------//

//! change all scream route to default: /:userhandle/scream/:screamId
// Screams routes
app.get("/screams", getAllScreams);
app.get("/scream/:screamId/withcomment", fbAuth, getScreamWithComment);
app.get("/scream/:screamId/withlike", fbAuth, getScreamWithLike);
app.get("/scream/:screamId/like", fbAuth, likeScream);
app.get("/scream/:screamId/unlike", fbAuth, unlikeScream);
app.post("/scream", fbAuth, createScream);
app.post("/scream/:screamId/comment", fbAuth, commentOnScream);
app.delete("/screams", deleteAllScreams);
app.delete("/scream/:screamId", fbAuth, deleteScream);

// Likes
app.delete("/likes", deleteAllLikes);

// Users routes
app.get("/users", getAllUserInfo);
app.get("/:handle", fbAuth, getUserOwnDetailWithScream);
app.get("/:handle/data", fbAuth, getDataOfUser);
app.post("/signUp", signUp);
app.post("/signin", signIn);
// app.post("/:handle/image", fbAuth, upload);
app.post("/:handle/profile", fbAuth, addUserDetails);

//! understand each comment is as like scream(see twitter)
//! change all scream route to default: /:userhandle/scream/:screamId
// Comments routes
app.get("/comments", getAllComments); //TODO: don't push to repo into master branch
app.get("/comment/:commentId", fbAuth, getComment);
app.post("/comment/:commentId", fbAuth, replyOnComment);
app.delete("/comments", fbAuth, deleteAllComments);
app.delete("/comment/:commentId", fbAuth, deleteComment);

exports.api = functions.https.onRequest(app);
