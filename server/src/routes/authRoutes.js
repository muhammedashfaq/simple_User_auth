const express = require('express')
const authRoutes = express.Router()
const { signupUser, loginUser } = require('../controller/userController')

authRoutes.post('/register', signupUser)
authRoutes.post('/login', loginUser)

module.exports = authRoutes