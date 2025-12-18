const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')

loginRouter.post('/', async(request, response, next) => {
    const {username, password} = request.body

    try{
        const user = await User.findOne({username})
        if (!user){
            return response.status(401).json({error: 'invalid username'})
        }
        const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
        if (!passwordCorrect){
            return response.status(401).json({error: 'invalid password'})
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        console.log("User's name: ", user.name)

        const token = jwt.sign(userForToken, process.env.SECRET)

        response.status(200).send({
            token,
            username: user.username,
            name: user.name,
            id: user._id
        })
    } catch (error) {
        next(error)
    }
})

module.exports = loginRouter