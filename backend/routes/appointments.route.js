const express = require('express')
const router = express.Router();

const checkauth = require('../middlewares/auth.middleware');
const checkrole = require('../middlewares/auth.role.middleware');

const {bookappointment,getbookinngsappointment,updatestatus} = require('../controllers/appointment.controller');


router.get('/',checkauth,getbookinngsappointment);
router.post('/',checkauth,bookappointment);
router.patch('/status',checkauth,updatestatus)

module.exports = router;