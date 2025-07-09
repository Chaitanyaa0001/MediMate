const express = require('express');
const router = express.Router();
const checkauth = require('../middlewares/auth.middleware');
// const checkrole = require('../middlewares/auth.role.middleware');
const parser = require('../middlewares/upload.middleware');
const {getcurrentuser,updateprofile,updateprofilephoto,updatepassowrd,deleteuser} = require('../controllers/user.controller')

router.get('/',checkauth,getcurrentuser);
router.put('/',checkauth,updateprofile);
router.put('/',checkauth,updatepassowrd);

router.put('/', checkauth, parser.single('profilephoto'), (req, res, next) => {
}, updateprofilephoto);
router.delete('/',checkauth,deleteuser);

module.exports = router;