const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/img': 'img',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('postImage');

// const storage = multer.diskStorage({
//     destinaiton: (req, file, cb) => {
//         cb(null, './images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// //var upload
// module.exports = multer({
//     storage: storage,
//     limits: {fileSize: '1000000'},
//     fileFilter: (req, file, cb) => {
//         const fileTypes = /jpeg|jpg|png|img/
//         const mimeType = fileTypes.test(file.mimetype)
//         const extname = fileTypes.test(path.extname(file.originalname))

//         if(mimeType && extname) {
//             return cb(null, true)
//         }
//         cb('Please upload a proper image to upload')
//     }
// }).single('postImage')
