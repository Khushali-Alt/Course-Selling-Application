const express = require('express');
const mongoose=require("mongoose");
require("dotenv").config();

const {userRouter}=require("./Routes/user");
const {courseRouter}=require ("./Routes/course")
const {adminRouter}=require("./Routes/admin");
const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connected"))
.catch(err => console.log(err));

// createCourseRoutes(app); // its not clearly defining
// createUserRoutes(app);

//middleware -->> req.body se data tabhi jayega db me agar ye middleware hua to
app.use(express.json());





// app.use("/api/v1/user", userV2Router); -->> its a benifit for future
app.use("/api/v1/user", userRouter); // its a good way to do Backend
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);




async function dbCoonect(){
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(3000);
    console.log("listening on 30000 port")

  }

dbCoonect()
