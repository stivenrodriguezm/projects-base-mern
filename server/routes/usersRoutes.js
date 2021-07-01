const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

//middleware
const {requireLogin} = require("../middleware/auth")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.get("/data", requireLogin, userController.userData) //only /auth
//router.post("/edit")
//router.get("/logout")


module.exports = router