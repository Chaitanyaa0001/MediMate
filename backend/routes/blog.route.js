const express = require('express');
const router = express.Router();

const checkauth = require('../middlewares/auth.middleware');
const checkrole = require('../middlewares/auth.role.middleware');
const {getblogs,postblogs} = require('../controllers/blog.controller');

router.get('/',checkauth,getblogs);
router.post('/',checkauth,checkrole('doctor'),postblogs);

module.exports = router;