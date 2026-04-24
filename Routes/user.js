// const express =require("express"); //{Router}
// const Router= express.Router;

const {Router}=require("express") // do the same as above both line
const userRouter=Router();


userRouter.post(" /signup", function(req, res){
    res.json({
        message:"signup endpoint"
    })
})

userRouter.post(" /signin", function(req, res){
    res.json({
        message:"signin endpoint"
    })
})

//only purchaged courses
userRouter.get("/purchases", function(req, res){
    res.json({
        message: "Purcheded"
    })
})


 module.exports={
     userRouter: userRouter
}

// module.exports = userRouter

// export default userRouter
