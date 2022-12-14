import mongoose from "mongoose";
import request from "supertest";
import app from "../server";
import Post from "../models/post_model";

let postId = "";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let postToUpdate = {};

beforeAll(async () => {
  await Post.remove();
});

afterAll(async () => {
  await Post.remove();
  mongoose.connection.close();
});

describe("Testing Postagram RESTful API", () => {
  const testMessage = "this is a test";
  const testSender = "111111";
  const testEditMessage = "Edited";

  test("Test POST request to add new post", async () => {
    const response = await request(app).post("/post").send({
      message: testMessage,
      sender: testSender,
    });
    expect(response.statusCode).toEqual(200);
    const newPost = response.body.post;
    expect(newPost.message).toEqual(testMessage);
    expect(newPost.sender).toEqual(testSender);
    postId = newPost._id;
    postToUpdate = newPost;
  });

  test("Tests GET request to fetch post by ID", async () => {
    const response = await request(app).get("/post/" + postId);
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual(testMessage);
    expect(response.body.sender).toEqual(testSender);
  });

  test("Tests GET request to fetch post by wrong ID, should fail", async () => {
    const response = await request(app).get("/post/09090");
    expect(response.body.message).toBeNull;
  });

  test("Tests GET request to fetch all posts", async () => {
    const response = await request(app).get("/post");
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].message).toEqual(testMessage);
    expect(response.body[0].sender).toEqual(testSender);
    expect(response.body[1]).toEqual(undefined);
  });

  test("Tests GET request to fetch all posts of a sender", async () => {
    const response = await request(app).get("/post?sender=" + testSender);
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].sender).toEqual(testSender);
  });

  test("Tests PUT request to update an existing post by ID", async () => {
    const response = await request(app)
      .put("/post/" + postId)
      .send({
        message: testEditMessage,
        sender: testSender,
      });
    expect(response.statusCode).toEqual(200);

    const response2 = await request(app).get("/post/" + postId);
    expect(response2.statusCode).toEqual(200);
    expect(response2.body.message).toEqual(testEditMessage);
  });
});
