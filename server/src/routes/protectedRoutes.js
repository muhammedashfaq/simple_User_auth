const express = require('express')
const protectedRoutes = express.Router()
const { userList, getauserData } = require('../controller/userController')
const { authMiddleware } = require('../middleware/authMiddleware')

protectedRoutes.use(authMiddleware)
protectedRoutes.get('/userDetails',userList)
protectedRoutes.post('/getauserData',getauserData)

module.exports = protectedRoutes