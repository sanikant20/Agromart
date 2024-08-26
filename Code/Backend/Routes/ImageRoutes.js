const express = require('express');
const app = express();
const multer = require("multer")
app.use(express.json());
const router = express.Router();

const imageModel = require("../Models/Image");

// Create storage for image
const Storage = multer.diskStorage({
    destination: "ImageFile/userImage",
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    },
});

// Create file for image storage
const upload = multer({
    storage: Storage,
}).single('uploadImage');

// API to upload image
router.post("/upload/image", (req, resp) => {
    try {
        upload(req, resp, async (err) => {
            if (err) {
                console.log(err);
            } else {
                try {
                    let newImage = new imageModel({
                        name: req.body.name,
                        image: {
                            data: req.file.filename,
                            contentType: 'image/png' || 'image/jpg' || 'image/jpeg',
                        },
                    });

                    // Save the newImage to the database
                    newImage = await newImage.save();

                    if (newImage) {
                        console.log("Uploaded");
                        resp.status(200).send({ message: "Uploaded" });
                    } else {
                        console.log("Error saving image");
                        resp.status(500).send({ message: "Internal Server Error" });
                    }
                } catch (error) {
                    console.error(error);
                    resp.status(500).send({ message: "Internal Server Error" });
                }
            }
        });
    } catch (error) {
        console.error(error);
        resp.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;