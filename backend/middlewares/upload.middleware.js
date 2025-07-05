const multer = require('multer');
const cloudinary = require('cloudinary');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:'medimate/account_photos',
        allowed_formats: ["jpg","jpeg","png"],
    }
});
const parser = multer({storage})

module.exports = parser;

