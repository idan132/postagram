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

describe("GET all posts", ()=> {
    test("Tests GET request to fetch all posts", async ()=>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
    })
})

