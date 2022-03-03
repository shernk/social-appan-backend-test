const { admin, db } = require("../admin-db");
const { v4: uuid_v4 } = require("uuid");
const config = require("../../config");
const path = require("path");
const os = require("os");
const fs = require("fs");

//! This file is being tested to upload image
//! BUG: filename is undefined(cannot get an image)
exports.upload = (req, res) => {
  let imageFileName;
  let imageToBeUploaded = {};
  let generatedToken = uuid_v4();

  const filename = req.file.name;
  console.log(filename);
  // my.image.png => ['my', 'image', 'png']
  const mimetype = filename.split(".")[filename.split(".").length - 1];

  // random name of an image created
  // Ex: 32756238461724837.png
  imageFileName = `${Math.round(
    Math.random() * 1000000000000
  ).toString()}.${imageExtension}`;

  const filepath = path.join(os.tmpdir(), imageFileName);
  imageToBeUploaded = { filepath, mimetype };

  file.pipe(fs.createWriteStream(filepath));

  admin
    .storage()
    .bucket()
    .upload(imageToBeUploaded.filepath, {
      resumable: false,
      metadata: {
        metadata: {
          contentType: imageToBeUploaded.mimetype,
          //Generate token to be appended to imageUrl
          firebasesStorageDownloadTokens: generatedToken,
        },
      },
    })
    .then(() => {
      // Appen Token to URL
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;

      console.log(imageUrl);

      return db.doc(`/Users/${req.user.handle}`).update({ imageUrl });
    })
    .then(() => {
      return res.json({ message: "image uploaded successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
