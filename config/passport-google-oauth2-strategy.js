// npm install passport-google-oauth
//npm install crypto
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        //below info get from console.developers.com =>go to codeial project created
        clientID:"399691637146-fg31phq30hvpkh9qjijdicb79j59urle.apps.googleusercontent.com",
        clientSecret:"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",
        callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy passport',err);
                return;
            }
            console.log(profile);
            if(user){
                //if found then set this user as req.user
                return done(null,user);
            }else{
                //if user not found then signup i.e create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                },function(err,user){
                    if(err){
                        console.log('error in creating user  google strategy passport',err);
                        return;
                    }
                    else{
                        return done(null,user);
                    }
                })
            }
        })
    }
));

module.exports=passport;


