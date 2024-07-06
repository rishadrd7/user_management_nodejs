const express=require("express");
const user_route=express();
const session = require("express-session");

//session handle function
const middleware=require("../middleware/auth")


user_route.set("view engine","ejs");
user_route.set("views","./views/users");
user_route.use(session({secret:"session",resave:false,saveUninitialized:true}))

//require user controller
const userController = require("../controller/userController");

//require registerpage 
user_route.get("/signUp",middleware.userinditta,userController.loadRegister); 

user_route.post("/signUp",userController.insertUser);

//require loginpage
user_route.get("/login",middleware.userinditta,userController.loginLoad);

user_route.post("/login",userController.verifyLogin);


//require homepage  //session
user_route.get("/homepage",middleware.userindo,userController.loadHome);

//logout loginpage

user_route.get("/logout",userController.userLogout);




module.exports=user_route;