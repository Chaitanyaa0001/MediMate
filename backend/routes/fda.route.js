const express = require('express');
const router = express.Router();

const {searchdrugs} = require('../controllers/fda.controller');
const checkauth = require('../middlewares/auth.middleware');

router.get('/', searchdrugs)

module.exports = router;