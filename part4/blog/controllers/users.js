const userRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')

userRouter.post('/', async(request, response, next) => {
    try{
        const {username, password, name} = request.body
        const passwordHash = await bcrypt.hash(password, 10)

        if (username.length < 3 || password.length < 3) {
            return response.status(400).json({error: 'username and password must be at least 3 characters long'})
        }

        const user = new User({
            username,
            name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/', async(request, response) => {
    try{
        const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })
        response.json(users)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter