"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const post_model_1 = __importDefault(require("../models/post_model"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let posts = {};
        if (req.query.sender == null || req.query.sender == undefined) {
            posts = yield post_model_1.default.find();
        }
        else {
            posts = yield post_model_1.default.find({ 'sender': req.query.sender });
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
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findById(req.params.id);
        res.status(200).send(post);
    }
    catch (err) {
        res.status(400).send({ 'status': "failed" });
    }
});
const updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield post_model_1.default.findByIdAndUpdate(req.params.id, {
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
const addNewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body.message;
    const sender = req.body.sender;
    const post = new post_model_1.default({
        message: message,
        sender: sender
    });
    try {
        const newPost = yield post.save();
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