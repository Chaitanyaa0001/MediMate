const express = require('express');
const router = express.Router();

const checkauth = require('../middlewares/auth.middleware');
const {getblogs,postblogs} = require('../controllers/blog.controller');

router.get('/',checkauth,getblogs);
router.post('/',checkauth,postblogs);

module.exports = router;