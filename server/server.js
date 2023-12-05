const express = require("express")
const app = express()
const cors = require('cors')
require('dotenv').config()

const mongoConnect = require('./src/config/mongoDB')
mongoConnect()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use("/auth", require("./src/routes/authRoutes"))
app.use("/protected", require("./src/routes/protectedRoutes"))

app.listen(port, () => console.log(`server connected on port no ${port}`))