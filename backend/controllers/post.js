const Post = require('../models/post_model.js')

const getPosts = async (req,res,next) => {
    try{
        let posts = {}
        if(req.query.sender == null || req.query.sender == undefined){
            posts = await Post.find()
        }else{
            posts = await Post.find({'sender':req.query.sender})
        }
        res.status(200).send(posts)
    }catch (err){
        console.log("Failed fetching posts")
        res.status(500).send({
            "status":"Failed",
            "message":"An error has occured fetching your posts"
        })
    }
}

const getPostById = async (req,res,next) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).send(post)
    }catch(err){
        res.status(400).send({'status':"failed"})
    }
}

const updatePostById = async (req,res,next) =>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, {
            message : req.body.message
        })
        res.status(200).send({
            "status":"Updated",
            "post": post
        })
    }catch(err){
        res.status(400).send({"error":"Did not update"})
    }
}
const addNewPost = async (req,res,next) =>{
    const message = req.body.message
    const sender = req.body.sender
    const postId = req.body._id

    post = new Post({
        message : message,
        sender : sender,
        _id : postId
    })

    try{
        newPost = await post.save()
        console.log("Success! uploaded new post")
        res.status(200).send({
            "status":"ok",
            "post": newPost
        })
    }
    catch (err){
        console.log(err.message)
    }  
}

module.exports = {getPosts, addNewPost, getPostById, updatePostById}