const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to which user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //comment is of which post
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},
{
    timestamps:true
});

const Comment=mongoose.model('Comment',commentSchema);
module.exports=Comment;