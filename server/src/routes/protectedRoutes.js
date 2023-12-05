const express= require('express')
const protectedRoutes= express.Router()
const {userList} =require('../controller/userController')
const { authMiddleware } = require('../middleware/authMiddleware')

protectedRoutes.post('/userDetails',authMiddleware, userList)



module.exports= protectedRoutes