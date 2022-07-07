const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
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
});

let renderTemplate=(data,relativePath)=>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');return;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}