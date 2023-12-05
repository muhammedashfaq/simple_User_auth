const asynchHandler = require('express-async-handler')
const User = require("../model/userModel")
const bcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const signupUser = asynchHandler(async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.findOne({ email })
    if (user) {
        return res.status(400).send({ message: "This User Already Exist", success: false })
    } else {
        const hashedPassword = await bcypt.hash(password, 10)
        const userData = new User({ name, email, password: hashedPassword })
        await userData.save()
        return res.status(200).send({ message: "User Created", success: true })

    }


})

const loginUser = asynchHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).send({ message: "This user Not valid", success: false })
    }

    const checkpassword = await bcypt.compare(password, user.password)
    if (!checkpassword) {
        return res.status(401).send({ message: "Wrong password", success: false })
    } else {
        const token = jwt.sign(
            { id: user._id, name: user.name, role: "USER" },
            process.env.JWT_SECRET_USER,
            { expiresIn: "1d" }

        )
        res.status(200).send({ message: "logged", success: true, data: token })

    }

})

const userList = asynchHandler(async (req, res) => {
    const id = req.userId;
    const user = await User.findOne({ _id: id });
    if (!user) {
        return res
            .status(400)
            .send({ message: "user does not exisr", success: false });
    } else {
        const userDetails = await User.find({}, { password: 0 })

        res.status(200).send({ message: "dataFetched", success: true, data: userDetails })
    }

})


module.exports = {
    loginUser,
    signupUser,
    userList
}