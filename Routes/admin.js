const {Router}= require("express");
const adminRouter=Router();
const {adminModel}= require("../db.js");


adminRouter.post(" /signup", function(req, res){
    res.json({
        message:"signup endpoint"
    })
})

adminRouter.post(" /signin", function(req, res){
    res.json({
        message:"signin endpoint"
    })
})


//middleware ki position is important
//admin routes is protected by the minddleware


// adminRouter.use(adminMiddleware);

//course creation by admin
adminRouter.post("/", function(req, res){
    res.json({
        message: "admin course"
    })
})

//admin can change in the post
adminRouter.put("/", function(req, res){
    res.json({
        message: "admin course"
    })
})

//admin get all the courses that created
adminRouter.get("/bulk", function(req, res){
    res.json({
        message: "admin course"
    })
})


module.exports={
    adminRouter:adminRouter
}
