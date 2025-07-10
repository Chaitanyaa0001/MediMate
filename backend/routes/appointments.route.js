const express = require('express')
const router = express.Router();

const checkauth = require('../middlewares/auth.middleware');
const checkrole = require('../middlewares/auth.role.middleware');

const {bookappointment,getbookinngsappointment,updatestatus} = require('../controllers/appointment.controller');


router.get('/',checkauth,checkrole('doctor'),getbookinngsappointment);
router.post('/',checkauth,checkrole('patient'),bookappointment);
router.patch('/status',checkauth,checkrole('doctor'),updatestatus)

module.exports = router;