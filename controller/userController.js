//import
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Logical part
// register  api
exports.register = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email }) //singular finding
        if (userExist) return res.status(400).json({ errors: true, message: "User already Exist" })
        const salt = await bcrypt.genSalt()
        req.body.password = await bcrypt.hash(req.body.password, salt)
        const data = await User.create(req.body)
        return res.json({ error: false, data: data })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

//Login logic
exports.login = async (req, res) => {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (!userExist) return res.status(400).json({ errors: true, message: "Email or password Invalid" })

        const validPassword = await bcrypt.compare(req.body.password, userExist.password)
        if (!validPassword) return res.status(400).json({ errors: true, message: "Email or Password is Invalid" })
        
        const token = await jwt.sign({ id: userExist._id }, process.env.SEC)
        return res.json({ errors: false, data: { token: tocken, user: userExist } })
    } catch (error) {
        return res.status(400).json({ errors: true, message: error.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const data = await User.find("")
        return res.json({ errors: false, data: data })
    } catch (error) {
        return res.status(400).post({ errors: true, message: error.message })
    }
}