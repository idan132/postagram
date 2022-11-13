const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../server.js')
beforeAll (done => {
    done()
}) 

afterAll (done => {
    mongoose.connection.close()
    done()
})

describe("Testing Postagram API", ()=> {
    const testMessage = "this is a test"
    const testSender = "111111"

    test("Tests GET request to fetch all posts", async ()=>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
    })

    test("Test POST request to add new post",async()=>{
        const response = await request(app).post('/post').send({
            "message": testMessage,
            "sender":testSender
        })
        expect(response.statusCode).toEqual(200)
        const newPost = response.body.post
        expect(newPost.message).toEqual(testMessage)
    })
})

