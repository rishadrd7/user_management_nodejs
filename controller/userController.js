

const User = require('../models/userModel');
const bcrypt=require("bcrypt");


//set bcrypt

const securedPassword = async(password)=>{

    try{
       const passwordHash = await bcrypt.hash(password, 10);
       return passwordHash;

    }catch(error){
        console.log(error.message);
    }
}

//user registration

const loadRegister = async(req,res)=>{
    try{
        res.render("registration")

    }catch(error){
        console.log(error);
    }
}




const insertUser= async(req,res)=>{

    try{
        const spassword = await securedPassword(req.body.password);

        const user =new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:spassword,
            is_admin:0,

        });
        const userData=await user.save();

        if(userData){
            req.session.user_id = userData._id;
            res.redirect('/homepage')
        }else{
            res.render("registration",{message:"Registration Failed."});
        }

    }catch(error){
        console.log(error);
    }
}



//login user method

const loginLoad = async(req,res)=>{
    try{
        res.render("login");

    }catch(error){
        console.log(error);
    }
}

const verifyLogin = async(req,res)=>{
    try{
        const email=req.body.email;
        

        const userData = await User.findOne({email:email});

        if(userData){
           const passwordMatch = await bcrypt.compare(req.body.password,userData.password);
          
           if(passwordMatch){
            req.session.user_id = userData._id;
            res.redirect("/homepage")
           
           }
           else{
            res.render("login",{message:"Incorrect password.."})
           }

        }else{
            res.render("login",{message:"Email and Password incorrect.."});
        }

    }catch(error){
        console.log(error);
    }
}


//homepage start

const loadHome = async(req,res)=>{
    try{
        res.render("homepage")

    }catch(error){
        console.log(error);
    }
}



const userLogout= async(req,res)=>{
    try{
        req.session.destroy();
        res.redirect('/login');
    }catch(error){
        console.log(error);
    }
}


module.exports={
    loadRegister,
    insertUser,
    securedPassword,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout  
}