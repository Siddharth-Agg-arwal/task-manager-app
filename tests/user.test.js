const request = require('supertest')
const app = require('../src/app')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../src/models/user')


const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    name : 'Ditto',
    email : 'DittoFurr@gmail.com',
    password : 'DittolovesSex',
    tokens : [{
        token : jwt.sign({_id : userOneId}, process.env.JWT_SECRET)
    }]
}


beforeEach(async () => {
    await User.deleteMany(); // Clear database before each test
    const user = new User(userOne)
    await user.save()
});


test('Should sign up a new user', async () => {
    await request(app).post('/users').send({
        name : 'Sid',
        email : 'aggarwal.siddharth2003@yahoo.in',
        password : 'encrypted'
    }).expect(201);
})

test('Should login existing user', async () => {
    await request(app).post('/users/login').send({
        email : userOne.email,
        password : userOne.password
    }).expect(200)
})

test('Should fail on non-existent user', async () => {
    await request(app).post('/users/login').send({
        email : userOne.email,
        password : 'invalidpassword'
    }).expect(400)
})

//set is only used for headers which are only used for auth
test('Should get profile for user', async () => {
    console.log('Test Token:', userOne.tokens[0].token); // Debug token

    const response = await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send();

    console.log('Response:', response.status, response.body); // Debug response

    expect(response.status).toBe(200);
});
