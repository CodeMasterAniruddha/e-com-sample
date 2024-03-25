const route = require('express').Router()

const {register,login,getUser} = require('../controller/userController')

route.post ('/',register)
route.post('/login',login)
route.get('/',getUser)

module.exports = route