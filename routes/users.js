const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),usersController.createSession);
/*
basically when create-session called it authenticates if done then call usercontroller.createSession otherwise redirect to sign-in
*/
router.get('/sign-out',usersController.destroySession);


//the one below is automatically understood by passport-google(as given in documentation)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//this is the callback route
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);


module.exports=router;
