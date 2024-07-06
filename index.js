
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/userda ");

const express=require("express");
const app=express();
const nocache = require("nocache");





app.set("view engine","ejs");
app.set("views", "./views/users");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(nocache());

//for user route

const router=require("./routes/router");
app.use("/",router);


//for admin route

const adminRoute = require("./routes/adminRoute");
app.use('/admin',adminRoute);



//homepage

app.get('/',(req,res)=>{
    res.redirect('/login')
})



app.listen(3000,()=>{
    console.log("running on http://localhost:3000");
});
