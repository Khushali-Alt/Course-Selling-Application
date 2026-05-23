// const jwt=require("jsonwebtoken");
// const { JWT_USER_PASSWORD }= require ("../config")

// function userMiddleware(req, res, next){

//     const token=req.headers.token;

//     const decoded=jwt.verify (token, JWT_USER_PASSWORD);

// if (decoded){
//     req.userId=decoded.id;
//     next()
// }else {
//     res.status(403).json({
//         message: "You are not signed in"
//     })
// }
// }
// module.exports={
//     userMiddleware: userMiddleware
// }

const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(403).json({
                message: "Token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_USER_PASSWORD);

        req.userId = decoded.id;
        next();

    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    userMiddleware
};
