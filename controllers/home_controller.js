const Post=require('../models/post');
const User=require('../models/user');

// module.exports.home=function(req,res)
// {

//     //with this if we do post.user in home.ejs it only gives id(since we hv set user:req.user._id in post_controller) of the user,but if we need name,email,timecreated we need to populate the user
    
//     // Post.find({},function(err,posts)
//     // {
//     //     return res.render('home',{
//     //         title:'Codeial | Home',
//     //         posts:posts
//     //     });
//     // })


//     //populate the user of each post
//     //also populate comments and done by which user
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',//as we have name the array in post schema as comments
//         populate:{
//             path:'user'//name the user in post schema as user
//         }
//     })
//     .exec(function(err,posts)
//     {
//         User.find({},function(err,users){
//             return res.render('home',{
//                 title:'Codeial | Home',
//                 posts:posts,
//                 all_users:users
//             });
//         })
//     })
// }











module.exports.home= async function(req,res)
{
    try{
        let posts=await Post.find({})
        .sort('-createdAt')//sort acc to time of creation=>latest one showimg first
        .populate('user')
        .populate({
            path:'comments',//as we have name the array in post schema as comments
            populate:{
                path:'user'//name the user in post schema as user
            }
        });

        let users=await User.find({});

        return res.render('home',{
            title:'Codeial | Home',
            posts:posts,
            all_users:users
        });
    }catch(err){
        console.log('Error',err);
        return; 
    }
}

