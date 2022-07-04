const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/user');



//tell passport to use localstrategy
passport.use(new LocalStrategy({
        //always need to define usernameField with the one u use as username in schemma(one which is going to be unique)
        usernameField:'email',
        //this will allow to pass req variable to callback
        passReqToCallback:true
    },
    function(req,email,password,done)
    {
        //find a user and establish identity
        User.findOne({
            //the first email is of schemma property defined by us, the second one is the one which function takes as argument
            email:email},function(err,user){
                if(err)
                {
                    req.flash('error',err);
                    return done(err);
                }
                if(!user || user.password!=password){
                    req.flash('error','Invalid Username/Password');
                    return done(null,false);
                }
                return done(null,user);
        });
    }
))

//serializing the user to decide which key is to be kept in the cookies
//basically after finding the user ,alloting cookie to it based on its id and then passport encrypts it automatically
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log('Error in finding user -->Passport');
            return done(err);
        }
        return done(null,user); 
    });
});


//sending data of logged in user to views

//step 1]check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in ,then pass on the request to the next function(controllers action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in  user from the session cookie and we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;