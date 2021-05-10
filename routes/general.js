var express=require('express');
var router=express.Router();
 
const generalController=require('../controllers/general');
 

router.get('/', generalController.getIndex);
router.post('/loadBackend', generalController.sendData);
router.post('/loginSubmit', generalController.loginHandler)
router.post('/register', generalController.registerHandler)

 
module.exports=router;


