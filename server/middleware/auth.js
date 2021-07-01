const jwt = require("jsonwebtoken")

exports.requireLogin = (req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1]
            
            //verify token is still valid
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            if(decode.exp > Date.now()){
                return res.status(401).json({message: "Session has expired, please login again"})
            } 
            next()
        } else {
            return res.status(400).json({message: "Unauthorized"})
        }
    } catch (error) {
        console.log("Something went wrong")
    }
}