const express = require('express');
const router = express.Router();

// const checkauth = require('../middlewares/auth.middleware');
// const checkrole = require('../middlewares/auth.role.middleware')

const { signup,signin,logout} = require('../controllers/auth.controller')

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/logout',logout);

module.exports =  router;