const express = require("express")
const app= express()
require('dotenv').config()
const mongoConnect = require('./src/config/mongoDB')
mongoConnect()
const port = process.env.PORT || 5000

app.use(express.json())
app.use("/auth",require("./src/routes/authRoutes"))
// app.use("/protected",require("./src/routes/authRoutes"))


app.listen(port,()=>console.log(`server connected on port no ${port}`))