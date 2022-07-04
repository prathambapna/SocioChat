const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res)
{
    try{
        let post=await Post.create({
            //we have got the post schema above
            //now can access content,user
            //here user._id (can refer in robo3t)
            //req.body.content is bcoz we hv given name of form as content
            content:req.body.content,
            user:req.user._id
        });

        //if the req is in xhml http request i.e via ajax
        if(req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
            post = await post.populate('user','name');
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            })
        }

        req.flash('success','Post published!');
        return res.redirect('back');
    }catch(err)
    {
        req.flash('error',err);
        
        return res.redirect('back');
    }
}

//will be deleting according to action=> /posts/destroy/:id
//in params there would be id of post
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        //.id means converting the object id (._id) to string
        if(post.user==req.user.id)
        {
            post.remove();
            await Comment.deleteMany({
                post:req.params.id
            });

            if(req.xhr)
            {
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted"
                });
            }

            req.flash('success','Post and associated comments deleted!')
            return res.redirect('back');
        }else{
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }
    }catch(err)
    {
        req.flash('error',err);
        return res.redirect('back');
    }
    
}