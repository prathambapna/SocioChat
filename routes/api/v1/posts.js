const express=require('express');
const router=express.Router();
const passport=require('passport');
const postsApi=require("../../../controllers/api/v1/posts_api");
router.get('/',postsApi.index);

//strategy would be jwt, session:false =>do not want session cookies to be generated
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy);
module.exports=router;