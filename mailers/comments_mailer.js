const nodeMailer=require('../config/nodemailer');


//this is another way of exporting a method instead of module.exports just to be familiar with this too
exports.newComment=(comment)=>{
    let htmlString=nodeMailer.renderTemplate({
        comment:comment
    },'/comments/new_comment.ejs');
    nodeMailer.transporter.sendMail({
        from:"codeialapplication@gmail.com",
        to:comment.user.email,
        subject:"New Comment Published",
        html:htmlString
    },(err,info)=>{
        if(err)
        {
            console.log('error in sending mail',err);
            return;
        }
        console.log('message sent',info);
        return;
    });
}
