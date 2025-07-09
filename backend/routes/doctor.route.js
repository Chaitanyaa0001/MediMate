const express = require('express');
const router = express.Router();

const checkauth =  require('../middlewares/auth.middleware');
const checkrole = require('../middlewares/auth.role.middleware');
const {getalldoctors,postdoctor} = require('../controllers/doctor.controller');

router.get('/',checkauth,checkrole('patient'),getalldoctors);
router.post('/register',checkauth,checkrole('doctor'),postdoctor)

module.exports = router;