const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../server.js')
const Post = require('../models/post_model')


beforeAll (async () => {
    await Post.remove()
}) 

afterAll (async ()=> {
    await Post.remove()
    mongoose.connection.close()   
})

describe("Testing Postagram RESTful API", ()=> {
    const testMessage = "this is a test"
    const testSender = "111111"
    const testEditMessage = "Edited"

    test("Test POST request to add new post",async()=>{
        const response = await request(app).post('/post').send({
            "message": testMessage,
            "sender":testSender
        })
        expect(response.statusCode).toEqual(200)
        const newPost = response.body.post
        expect(newPost.message).toEqual(testMessage)
        expect(newPost.sender).toEqual(testSender)
    })

    test("Tests GET request to fetch all posts", async ()=>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].message).toEqual(testMessage)
        expect(response.body[0].sender).toEqual(testSender)
        expect(response.body[1]).toEqual(undefined)
    })

    test("Tests GET request to fetch all posts of a sender", async ()=>{
        const response = await request(app).get('/post?sender='+testSender)
        expect(response.statusCode).toEqual(200)
        expect(response.body[0].sender).toEqual(testSender)
    })
})

