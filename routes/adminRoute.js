const express=require("express");
const admin_route =express();

const confiq = require("../config/config");

const session = require("express-session");
//session handle

const middleware= require("../middleware/adminauth");



admin_route.use(express.json());
admin_route.use(express.urlencoded({extended:true}));


admin_route.set("view engine","ejs");
admin_route.set("views","./views/admin");
admin_route.use(session({secret:"session",resave:false,saveUninitialized:true}))


const adminController = require("../controller/adminController");



admin_route.get("/",adminController.loadLogin);



admin_route.post("/",adminController.verifyLogin);

admin_route.get('/dashboard',adminController.loadDashboard);


admin_route.get("/edit-user",adminController.editUserLoad);

admin_route.post('/edit-user',adminController.updateUsers);

admin_route.get("*",(req,res)=>{
    res.redirect("/admin/edit-user")
});



module.exports=admin_route;