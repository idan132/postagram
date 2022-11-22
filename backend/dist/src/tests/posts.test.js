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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const post_model_1 = __importDefault(require("../models/post_model"));
let postId = '';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let postToUpdate = {};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield post_model_1.default.remove();
    mongoose_1.default.connection.close();
}));
describe("Testing Postagram RESTful API", () => {
    const testMessage = "this is a test";
    const testSender = "111111";
    const testEditMessage = "Edited";
    test("Test POST request to add new post", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).post('/post').send({
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
    test("Tests GET request to fetch post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post/' + postId);
        expect(response.statusCode).toEqual(200);
        expect(response.body.message).toEqual(testMessage);
        expect(response.body.sender).toEqual(testSender);
    }));
    test("Tests GET request to fetch all posts", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post');
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].message).toEqual(testMessage);
        expect(response.body[0].sender).toEqual(testSender);
        expect(response.body[1]).toEqual(undefined);
    }));
    test("Tests GET request to fetch all posts of a sender", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/post?sender=' + testSender);
        expect(response.statusCode).toEqual(200);
        expect(response.body[0].sender).toEqual(testSender);
    }));
    test("Tests PUT request to update an existing post by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).put('/post/' + postId).send({
            "message": testEditMessage,
            "sender": testSender
        });
        expect(response.statusCode).toEqual(200);
        const response2 = yield (0, supertest_1.default)(server_1.default).get('/post/' + postId);
        expect(response2.statusCode).toEqual(200);
        expect(response2.body.message).toEqual(testEditMessage);
    }));
});
//# sourceMappingURL=posts.test.js.map