// const jwt=require("jsonwebtoken");
// const { JWT_ADMIN_PASSWORD }= require ("../config")

// function adminMiddleware(req, res, next){
//     try{
//     const token=req.headers.token;
//     const decoded=jwt.verify (token, JWT_ADMIN_PASSWORD);

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
//     adminMiddleware: adminMiddleware
// }

const { courseModel } = require("../db");

const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(403).json({
                message: "Token missing"
            });
        }

        const token = authHeader.split(" ")[1]; // Bearer TOKEN

        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

        req.userId = decoded.id;
        next();

    } catch (err) {
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    adminMiddleware
};
