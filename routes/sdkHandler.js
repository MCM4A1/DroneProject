var express = require('express');
var router = express.Router();

//const homeController = require('../controllers/sdkHandler');
const sdkController = require('../controllers/sdkHandler');

//router.get('/', homeController.getHome);
router.get('/', sdkController.submitSdk);

//Ide mi kellene még?
module.exports = router;