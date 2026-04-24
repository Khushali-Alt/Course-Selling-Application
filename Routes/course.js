
const {Router}=require ("express");
const courseRouter=Router();


courseRouter.post("/purchase", function(req,res){
    //you would expect user to pay you money
    res.json({
        message:"user pay the money"
    })
})


//all the current courses with prices
courseRouter.get("/preview", function(req, res){
    res.json({
        message:"all coourses"
    })
})


module.exports={
     courseRouter: courseRouter
}
// module.exports = courseRouter


// export default courseRouter
