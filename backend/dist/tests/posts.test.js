var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server.js');
const Post = require('../models/post_model');
let postId = '';
let postToUpdate = {};
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield Post.remove();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    yield Post.remove();
    mongoose.connection.close();
}));
describe("Testing Postagram RESTful API", () => {
    const testMessage = "this is a test";
    const testSender = "111111";
    const testEditMessage = "Edited";
    test("Test POST request to add new post", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(app).post('/post').send({
            "message": testMessage,
            "sender": testSender
        });
        expect(response.statusCode).toEqual(200);
        const newPost = response.body.post;
        expect(newPost.message).toEqual(testMessage);
        expect(newPost.sender).toEqual(testSender);
        postId = newPost._id;
        postToUpdate = newPost;
    }));
    test("Tests GET request to fetch post by ID", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(app).get('/post/' + postId);
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(testMessage);
        expect(response.body.sender).toEqual(testSender);
    }));
    test("Tests GET request to fetch all posts", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(app).get('/post');
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(testMessage);
        expect(response.body[0].sender).toEqual(testSender);
        expect(response.body[1]).toEqual(undefined);
    }));
    test("Tests GET request to fetch all posts of a sender", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(app).get('/post?sender=' + testSender);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].sender).toEqual(testSender);
    }));
    test("Tests PUT request to update an existing post by ID", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield request(app).put('/post/' + postId).send({
            "message": testEditMessage,
            "sender": testSender
        });
        expect(response.statusCode).toEqual(200);
        const response2 = yield request(app).get('/post/' + postId);
        expect(response2.statusCode).toEqual(200);
        expect(response2.body.message).toEqual(testEditMessage);
    }));
});
//# sourceMappingURL=posts.test.js.map