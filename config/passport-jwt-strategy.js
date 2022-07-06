const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');

let opts={
    //extract from bearer inside authorization inside header
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    //key to encrypt
    secretOrKey:'codeial',
}


//store the user info in payload
passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){
    User.findById(jwtPayLoad._id,function(err,user){
        if(err){
            console.log('Error in finding user from JWT');
            return;
        }
        if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}));

module.exports=passport;