let express = require('express');
let router = express.Router();

const generalController = require('../controllers/general');
const sdkController = require('../controllers/sdkController');

router.get('/', generalController.getIndex);
router.get('/sdkController', sdkController.getIndex);

module.exports = router;


