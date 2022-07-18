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
    google_call_back_url:"ht tp://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
}

const production={
    name:'production'
}

module.exports=development;