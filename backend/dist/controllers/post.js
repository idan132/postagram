var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Post = require('../models/post_model.js');
const getPosts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        let posts = {};
        if (req.query.sender == null || req.query.sender == undefined) {
            posts = yield Post.find();
        }
        else {
            posts = yield Post.find({ 'sender': req.query.sender });
        }
        res.status(200).send(posts);
    }
    catch (err) {
        console.log("Failed fetching posts");
        res.status(500).send({
            "status": "Failed",
            "message": "An error has occured fetching your posts"
        });
    }
});
const getPostById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const post = yield Post.findById(req.params.id);
        res.status(200).send(post);
    }
    catch (err) {
        res.status(400).send({ 'status': "failed" });
    }
});
const updatePostById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const post = yield Post.findByIdAndUpdate(req.params.id, {
            message: req.body.message
        });
        res.status(200).send({
            "status": "Updated",
            "post": post
        });
    }
    catch (err) {
        res.status(400).send({ "error": "Did not update" });
    }
});
const addNewPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const message = req.body.message;
    const sender = req.body.sender;
    post = new Post({
        message: message,
        sender: sender
    });
    try {
        newPost = yield post.save();
        console.log("Success! uploaded new post");
        res.status(200).send({
            "status": "ok",
            "post": newPost
        });
    }
    catch (err) {
        console.log(err.message);
    }
});
module.exports = { getPosts, addNewPost, getPostById, updatePostById };
//# sourceMappingURL=post.js.map