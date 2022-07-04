//importing model
const User=require('../models/user');
const fs=require('fs');
const path=require('path');

//not need to change to async await as only one callback
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
            return res.render('profile',{
                title:'User Profile',
                profile_user:user
        });
    })
}
module.exports.update= async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,User){
    //         req.flash('success','Profile Updated successfully!'); 
    //         return res.redirect('back');
    //     });
    // }else{
    //     //if someone tries to fiddle by inspect nd then change id then show http 401 unauthorized part
    //     return res.status(401).send('Unauthorized');
    // }


    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*****Multer Error',err);}
                // console.log(req.file);
                //could not ready body of req without multer as form encytype is multipart
                user.name=req.body.name;
                user.email=req.body.email;
                if(req.file){
                    //if user already has a file before then delete the previous one and save the new one, making storage efficient
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    //this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        }catch(err)
        {
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        //if someone tries to fiddle by inspect nd then change id then show http 401 unauthorized part
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}
//render the sign up page
module.exports.signUp=function(req,res){

    //we only want user to access signup page when not signed in that is not authenticated
    //otherwise redirect to profile page
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}
//render the sign in page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the signup data
module.exports.create=function(req,res)
{
    //if password not equal to confirm password
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in signing up');return;}

        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){console.log('error in signing up');return;}
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
} 

//create session for sign in
module.exports.createSession=function(req,res)
{
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
} 

module.exports.destroySession=function(req,res){
    req.logout(function(err)
    {
        if(err){return res.redirect('back');}
        
        req.flash('success','You have logged out!');
        return res.redirect('/');
    });
}