const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
//if log directory exists then good otherwise create it using file system
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream= rfs.createStream('access.log',{
    interval:'1d',
    path:logDirectory
});

const development={
    name:'development',
    asset_path:'/assets',
    session_cookie_key:'blahsomething',
    db:'goSocial_development',
    smtp:{
        service:'gmail',
        //go to gmail smtp settings on google
        //from there get the host for gmail,port:587 is for tls (transport layer secure )
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:'codeialapplication@gmail.com',
            //go to this email =>security=>do 2 step verification=>then app password=>then for mail for windows computer=>generate password=>use that password here 
            pass:'utfmapramalrfgzv'
        }
    },
    google_client_id:"399691637146-fg31phq30hvpkh9qjijdicb79j59urle.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8080/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

//go and save all these in environment variables=>system variables
//CODEIAL_ENVIRONMENT="production" set in env variables
const production={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    //go to random key gen website, choose as per requirement
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        //go to gmail smtp settings on google
        //from there get the host for gmail,port:587 is for tls (transport layer secure )
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            //go to this email =>security=>do 2 step verification=>then app password=>then for mail for windows computer=>generate password=>use that password here 
            pass:process.env.CODEIAL_GMAIL_PASSWORD,
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}
// module.exports=development;
module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined?development:eval(process.env.CODEIAL_ENVIRONMENT);