const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){
    let posts=await Post.find({})
    .sort('-createdAt')//sort acc to time of creation=>latest one showimg first
    .populate('user')
    .populate({
        path:'comments',//as we have name the array in post schema as comments
        populate:{
            path:'user'//name the user in post schema as user
        }
    });
    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        if(post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({
                post:req.params.id
            });
            return res.status(200).json({
                message:"Post and associated comments deleted successfully"
            });
        }else{
            return res.status(401).json({
                message:"You cannot delete this post"
            });
        }
    }catch(err)
    {
        return res.status(500).json({
            message:"Internal Server Error"
        });  
     }
}