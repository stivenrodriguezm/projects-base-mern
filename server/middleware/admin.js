const jwt = require("jsonwebtoken")
const jwt_decode = require('jwt-decode')
const User = require('../models/UserModel')

exports.requireAdminAccount = async (req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1]
            
            //verify token is still valid
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            if(decode.exp > Date.now()){
                return res.status(401).json({message: "Session has expired, please login again"})
            } 

            // verify this user is an admin
            const decodedData = jwt_decode(req.headers.authorization)
            const id = decodedData._id

            const user = await User.findById(id)
            if(user.role === 1){
                next()
            } else{
                return res.status(407).json({message: "Function available for admin users only."})
            }
        } else {
            return res.status(400).json({message: "Unauthorized"})
        }
    } catch (error) {
        console.log("Something went wrong")
    }
}