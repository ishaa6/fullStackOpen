require('../utils/mongoose')
const {test, beforeEach, describe, after} = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/users')
const api = supertest(app)

describe('POST /api/users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('Invalid user is not created (username too short)', async () => {
        const newUser = {
            username: 'ab',
            name: 'Short Username',
            password: 'validpassword'
        }

        const beforeUpdateUsers = await User.find({})

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const afterUpdateUsers = await User.find({})
        assert.strictEqual(beforeUpdateUsers.length, afterUpdateUsers.length)
    })

    test('Invalid user is not created (password too short)', async () => {
        const newUser = {
            username: 'validusername',
            name: 'Short Password',
            password: 'pw'
        }

        const beforeUpdateUsers = await User.find({})

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const afterUpdateUsers = await User.find({})
        assert.strictEqual(beforeUpdateUsers.length, afterUpdateUsers.length)   
    })
})

after(async () => {
  await mongoose.connection.close()
})