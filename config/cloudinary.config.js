const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config(); // this helps us to read the .env folder files.

//2 config the cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure:true
    
});

module.exports = cloudinary;