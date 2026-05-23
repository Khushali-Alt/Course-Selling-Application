 const express =require("express"); //{Router}
 const Router= express.Router;

 const {userModel, purchaseModel, courseModel} =require("../db")
const { userMiddleware }= require ("../middleware/user")
 const jwt=require ("jsonwebtoken");
 const bcrypt = require('bcrypt');

 const {JWT_USER_PASSWORD} =require("../config");
 const userRouter=Router();





userRouter.post("/signup", async function(req, res){
    try{
    const { email, password, firstName, lastName, role }= req.body;  //T0D0- adding zod validation

    //T0D0-hash the password so plaintext pw is not stored in the db
    if(!email || !password || !firstName){
        return res.status(400).json({
            message:"all fields are required"
        })
    }

    const validRoles = ["consumer", "admin"]
    //body se role liye and uski validity check, only valid if role is consumer and admin ho to
    if(role && !validRoles.includes(role)){
       return res.status(400).json({
            message:"Invalid Role"
        })
    }

    //agar account pahle se hi exist during signup--> invalid
    const isUserExists = await userModel.findOne({email});
    if(isUserExists){
        return res.status(400).json({
            message: "Invalid email or User Already Exists"
        })
    }

    //salting and hashing the password before storing in backend
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user //
    const user = await userModel.create({
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword
    })

    const token = jwt.sign(
        {
            id:user._id,
            role:user.role
        },
        process.env.JWT_SECRET,
        {expiresIn: '7d'},
    );

    return res.status(201).json({
            message: "Signup successful",
            token,
            user
        });

    } catch(err){
    res.status(500).json({
        message:"error while signup",
        error:err.message
    })
}

})





userRouter.post("/signin", async function(req, res){
    const { email, password} =req.body;

    //T0D0- ideally password should be hashed , and hence you cant compare the user provided password and the database password
    // yeha agar only-> .find --> return karega empty[] array
    // if-> .findOne--> return either user or Undefined
   const user= await userModel.findOne({
    email:email,
    password:password
   }); //[] or [{entries}]

   if(user){
    const token=jwt.sign({
        id: user._id
    }, JWT_USER_PASSWORD);

    //Do cookies logic

    res.json({
        token:token
    })

   }else{
    res.status(403).json({
        message:"Incorrect credentials"
    })
   }
})



//only purchaged courses
userRouter.get("/purchases",userMiddleware, async function(req, res){

    const userId=req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });


//_id: {$in: purchases.map(x => x.courseId)}  OR

// let purchasedCourseIds=[];
// for(let i=0; i<purchases.length; i++ ){
//     purchasedCourseIds.push(purchases[i].courseId)
// }



    const courseData = await courseModel.find({
        _id: {$in: purchases.map(x => x.courseId)}
    })
    res.json({
        purchases,
        courseData
    })
})


 module.exports={
     userRouter: userRouter,

}

// module.exports = userRouter

// export default userRouter
