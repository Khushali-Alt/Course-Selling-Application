const {Router}= require("express");
const adminRouter=Router();
const {adminModel}= require("../db.js");
const jwt=require ("jsonwebtoken");
const JWT_ADMIN_PASSWORD= "khushalitiwarri123455678";

// import bcrypt from "bcrypt";
// import * as z from "zod";
//bcrypt, zod, jsonWebToken

adminRouter.post("/signup", async function(req, res){
 try{
    const { email, password, firstName, lastName }= req.body;  //T0D0- adding zod validation

    //T0D0-hash the password so plaintext pw is not stored in the db

    //T0D0- put inside the try-catch block
   await adminModel.create({
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



adminRouter.post("/signin", async function(req, res){
    try{
   const { email, password} =req.body;

    //T0D0- ideally password should be hashed , and hence you cant compare the user provided password and the database password
    // yeha agar only-> .find --> return karega empty[] array
    // if-> .findOne--> return either user or Undefined


    //find admin by email- only
    const admin= await adminModel.findOne({
    email:email,
    password:password
   }); //[] or [{entries}]

   if(admin){
    const token=jwt.sign({
        id: admin._id
    }, JWT_ADMIN_PASSWORD);

    //Do cookies logic

    res.json({
        token:token
    })

   }else{
    res.status(403).json({
        message:"Incorrect credentials"
    })
   }
}catch(err){
    console.error(err);

    res.status(500).json({
        message:"internal server error "
    })
}
})


//middleware ki position is important
//admin routes is protected by the minddleware


// adminRouter.use(adminMiddleware);

//course creation by admin
adminRouter.post("/course", function(req, res){
    res.json({
        message: "admin course"
    })
})

//admin can change in the post
adminRouter.put("/course", function(req, res){
    res.json({
        message: "admin course"
    })
})

//admin get all the courses that created
adminRouter.get("/course/bulk", function(req, res){
    res.json({
        message: "admin course"
    })
})


module.exports={
    adminRouter:adminRouter
}
