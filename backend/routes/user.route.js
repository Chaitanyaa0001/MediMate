const express = require('express');
const router = express.Router();
const checkauth = require('../middlewares/auth.middleware');
// const checkrole = require('../middlewares/auth.role.middleware');
const parser = require('../middlewares/upload.middleware');
const {getcurrentuser,updateprofile,updateprofilephoto,updatepassowrd,deleteuser} = require('../controllers/user.controller')

router.get('/settings',checkauth,getcurrentuser);
router.put('/settings/update',checkauth,updateprofile);
router.put('/settings/password',checkauth,updatepassowrd);

router.put('/settings/photo', checkauth, parser.single('profilephoto'), (req, res, next) => {
  console.log("Hit upload route");
  console.log("REQ FILE:", req.file);
  console.log("REQ USER:", req.user);
  next();
}, updateprofilephoto);
router.delete('/settings/delete',checkauth,deleteuser);

module.exports = router;