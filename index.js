const express=require('express');
const env=require('./config/environment');
const logger=require('morgan');
const cookieParser=require('cookie-parser');
const app=express();

// require('./config/view-helpers')(app);

const port=8080;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require('./config/passport-google-oauth2-strategy');

//using mongostore to store the session cookies so that after every restart of server user does not gets logged out
const MongoStore= require('connect-mongo');


// setting up sass
const sassMiddleware=require('node-sass-middleware');

const flash=require('connect-flash');
const customMware=require('./config/middleware');


//setup chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

const path=require('path');

if(env.name=='development')
{
    app.use(sassMiddleware({
        src:path.join(__dirname,env.asset_path,'/scss'),
        dest:path.join(__dirname,env.asset_path,'/css'),
        debug:true,
        outputStyle:'extended',
        prefix:'/css'
    }));
}

//used for params and query in post request
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(__dirname + env.asset_path));

//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));

app.use(logger(env.morgan.mode,env.morgan.options));

//use it before using routes as it belongs to view which is going to  be rendered in routes so before it gets rendered we neet to specify layout
app.use(expressLayouts);
//extract style and scripts from subpages into the layout after calling expresslayouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//setup the view engine
app.set('view engine','ejs');
app.set('views','./views')


//after setting the views,use session as middleware 
//mongo store is udes to store the session cookie in db
app.use(session({
    name:'goSocial',
    //todo the secret before deployment in production mode
    //changed the secret part 
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
        //100 min =>1000 millisec,60sec
    },
    store:MongoStore.create({
        //got this url from mongodb atlas application
        mongoUrl:'mongodb://localhost:27017',
        autoRemove:'disabled'
    },function(err)
    {
        console.log(err || 'connect-mongo-db setup ok');
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)

//use flash after session is being used,bcoz flash uses session cookies
//whenever a session is created it will notify once as in if u r sign in and refresh it should not again show logged in successfully, but only when u hv signed out or session has been expired
app.use(flash());
app.use(customMware.setFlash);


//use express router(use before server starts  as middleware)
app.use('/',require('./routes'));

app.listen(port,function(error)
{
    if(error)
    {
        // console.log('Error:',err);
        // or
        console.log(`Error in running the server: $(error)`);
    }
    console.log(`Server is running on the port: ${port}`);

})