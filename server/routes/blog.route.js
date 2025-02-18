const express = require('express');
const { getAllBlogs, getBlogById, deleteBlog, createBlog } = require('../controllers/blog.controller.js');
const validateToken = require('../utils/validateToken');
const adminVerification = require('../utils/adminVerification');
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

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', multer({ storage: storage }).single('image'), validateToken, adminVerification, createBlog);
router.delete('/:id', validateToken, adminVerification, deleteBlog);

module.exports = router;
