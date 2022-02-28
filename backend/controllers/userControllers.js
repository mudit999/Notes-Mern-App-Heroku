const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Register
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;
    
    // checking if user already exists
    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error("User already Exists");
    }

    // adding entry in collection
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
        })
    }else{
        res.status(400);
        throw new Error("Error Occured ")
    }
});

// Login
const authUser = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
        })
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password")
    }
})

module.exports = {registerUser, authUser};