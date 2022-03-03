const { admin, db } = require("../admin-db");
const { v4: uuid_v4 } = require("uuid");
const config = require("../../config");
const busboy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");

exports.uploadImage = (req, res) => {

  const bb = new busboy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};
  let generatedToken = uuid_v4();

  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return res.status(400).json({ error: "Wrong file type submitted!" });
    }

    // my.image.png => ['my', 'image', 'png']
    const imageExtension = filename.split(".")[filename.split(".").length - 1];

    // random name of an image created
    // Ex: 32756238461724837.png
    // imageFileName = `${Math.round(
    //   Math.random() * 1000000000000
    // ).toString()}.${imageExtension}`;

    imageFileName = filename;

    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };

    file.pipe(fs.createWriteStream(filepath));
  });

  bb.on("finish", () => {
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
  });

  // The raw bytes of the upload will be in req.rawBody.
  // Send it to busboy, and get a callback when it's finished.
  bb.end(req.rawBody);
};
