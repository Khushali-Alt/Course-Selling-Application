const mongoose=require ("mongoose");
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;
require("dotenv").config();

console.log("connected to mongoose")
mongoose.connect(process.env.MONGO_URL)


const userSchema= new Schema({
    email:{ type:String, unique:true},
    password:String,
    firstName: String,
    lastName:String,

})

const adminSchema=new Schema({
    email:{ type:String, unique:true},
    password:String,
    firstName: String,
    lastName:String,

})

const courseSchema= new Schema({
  title:String,
  description:String,
  price:Number,
  imageUrl: String,
  creatorId: ObjectId    //its a reference with admin-schema

})

const purchaseSchema= new Schema({
    userId: ObjectId,  // refrence with userSchema
    courseId:ObjectId   // reference with courseSchema

})

const userModel=mongoose.model("user", userSchema)
const adminModel=mongoose.model("admin", adminSchema)
const courseModel=mongoose.model("course", courseSchema)
const purchaseModel=mongoose.model("purchase", purchaseSchema)


module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
