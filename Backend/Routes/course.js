
const {Router}=require ("express");
const { purchaseModel, courseModel } = require("../db");
const { userMiddleware }= require ("../middleware/user")
const courseRouter=Router();


courseRouter.post("/purchase",userMiddleware, async function(req,res){
    //you would expect user to pay you money
     const userId=req.userId;
     const courseId=req.body.courseId;

     //should check that the user has actually paid the price
     await purchaseModel.create({
           userId,
           courseId
     })

    res.json({
        message:"you have successfully bought the course"
    })
})


//all the current courses with prices
//no need to authentication->bcz kisi ke coourses dekhne ke liye authenticate nhi karna hota
courseRouter.get("/preview", async function(req, res){

    const courses =await courseModel.find({ }); // for all courses

    res.json({
        courses
    })
})


module.exports={
     courseRouter: courseRouter
}
// module.exports = courseRouter


// export default courseRouter
