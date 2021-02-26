let express=require('express');
let router=express.Router();
//let sdkControllerRouter ??
 
const homeController=require('../controllers/home');
 
router.get('/', homeController.getHome);
 
module.exports=router;


