const User = require("../models/userModel");
const bcrypt= require("bcrypt");


const loadLogin= async(req,res)=>{

    try{
        res.render('login');

    }catch(error){
        console.log(error);
    }
}



//admin login

const verifyLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });

        if (userData) {
            console.log(password);
            const passwordMatch = await bcrypt.compare(password, userData.password);
            console.log(passwordMatch);

            if (passwordMatch) {
                if (!userData.is_admin) {
                    res.render('login', { message: "Email and password incorrect..." });
                } else {
                    req.session.user_id = userData._id;
                    res.redirect("/admin/dashboard");
                }
            } else {
                res.render('login', { message: "Password incorrect..." });
            }
        } else {
            res.render('login', { message: "Email and password incorrect..." });
        }
    } catch (error) {
        console.log(error);
    }
};



//dashboard page

const loadDashboard = async(req,res)=>{
    try{
        const users=await (await User.find({})).reverse()
        res.render("dashboard",{users})
        
    }catch(error){
        console.log(error);
    }
}



// const adminDashboard = async(req,res)=>{
//     try{
//         res.render("dashboard")

//     }catch(error){ 
//         console.log(error);
//     }
// }

const editUserLoad = async(req,res)=>{
    try{
        res.render("edit-user");
    }catch(error){
        console.log(error);
    }
}


const updateUsers=async(req,res)=>{
    try{
      const userData = await  User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name, email:req.body.email }})
      res.redirect('/admin/dashboard')

    }catch(error){
        console.log(error);
    }
}


module.exports={
    loadLogin,
    verifyLogin,
    loadDashboard,
    // adminDashboard, 
    editUserLoad,
    updateUsers
}