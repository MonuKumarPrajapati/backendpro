const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinary.config');
const fs = require('fs')  // doesnt need to install inbuild m iddleware

const router = express.Router();  // this is used for creating a routes

const upload = multer({dest:'uploads/'})// this is used for temporary files upload before upload file to cloudinary


// making a route

router.post('/upload', upload.single('file'), async (req, res) => {
    try{
        const file = req.file; // Retrieves the file metadata (e.g., filename, path, size) stored by Multer in the (req.file) object.

        if (!file) return res.status(400).send('No file uploaded.');
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'my_project' // this create a folder in my cloudinary and store the data
        }) 

        //Delete the temporary file from ,local storage
        try {
            fs.unlinkSync(file.path); // Synchronous file deletion
          } catch (err) {
            console.error(`Failed to delete file: ${file.path}`, err);
          }
          

        //respond with Cloudinary filee URL

        res.status(200).send({
            message: 'File uploaded successfully',
            url: result.secure_url,
        })
    } catch (error) {
        res.status(500).send({ error: error.message });

    }

})

module.exports = router;