// const express =require("express"); //{Router}
// const Router= express.Router;

const {Router}=require("express") // do the same as above both line
const {userModel, purchaseModel, courseModel} =require("../db")
const { userMiddleware }= require ("../middleware/user")
const jwt=require ("jsonwebtoken");

const {JWT_USER_PASSWORD} =require("../config");

const userRouter=Router();



userRouter.post("/signup", async function(req, res){
    try{
    const { email, password, firstName, lastName }= req.body;  //T0D0- adding zod validation

    //T0D0-hash the password so plaintext pw is not stored in the db

    //T0D0- put inside the try-catch block
   await userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
} catch(err){
    res.status(500).json({
        message:"error while signup",
        error:err.message
    })
}
    res.json({

        message:"signup successfully "
    })
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
