const multer = require('multer');

// type of storage for images
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = { upload };