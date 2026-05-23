
//👉 Configuration ka matlab hota hai “settings” ya “setup values” jo app ko chalane ke liye chahiye hote hain.

// all configurable will be save  here


const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD= process.env.JWT_ADMIN_PASSWORD;

module.exports={
    JWT_ADMIN_PASSWORD,
    JWT_USER_PASSWORD
}
