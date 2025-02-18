const express = require('express');
const { getProducts, addProduct, rateProduct, updateProduct, getProductById, deleteProduct, loveProduct } = require('../controllers/product.controller.js');
const validateToken = require('../utils/validateToken.js');
const adminVerification = require('../utils/adminVerification.js');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', getProducts);
router.post('/', upload.array('images', 10), validateToken, adminVerification, addProduct);
router.get('/:id', getProductById);
router.put('/:id',validateToken, adminVerification, updateProduct);
router.delete('/:id',validateToken, adminVerification, deleteProduct);
router.post('/:id/rate', rateProduct);
router.post('/:id/love',validateToken, loveProduct);

module.exports = router;
