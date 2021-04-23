var express = require('express');
var router = express.Router();

const sdkController = require('../controllers/sdkHandler');

//router.get('/', homeController.getHome);
router.post('/', sdkController.submitSdk);
router.post('/automatization', sdkController.submitAutoToSdk);


module.exports = router;