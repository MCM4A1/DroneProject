let express = require('express');
let router = express.Router();
//let sdkControllerRouter ??

const homeController = require('../controllers/home');
const sdkController = require('../controllers/sdkHandler');

router.get('/', homeController.getHome);
router.get('/sdkHandler', sdkController.submitSdk);

module.exports = router;


