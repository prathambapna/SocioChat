// npm install passport-google-oauth
//npm install crypto
const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        //below info get from console.developers.com =>go to codeial project created
        clientID:env.google_client_id,
        clientSecret:env.google_client_secret,
        callbackURL:env.google_call_back_url,
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


