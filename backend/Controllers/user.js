const User = require('../Models/user')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')
require('dotenv').config;
const secretKey = process.env.SECRET_KEY

exports.signup = async (req, res) => {
    try{
        const {channelName, userName, about, password, profilePic} = req.body;
        const isExist = await User.findOne({userName})
        // checks if the user already exists
        if(isExist){
            res.status(400).json({
                success: false,
                msg: "Username Already Exists"
            })
        }
        else{

            // hash the password for security
            let hashedPass = await bcrypt.hash(password, 10);

            // creates a new user to the database
            const user = new User({
                channelName, 
                userName, 
                about, 
                password: hashedPass,
                profilePic
            })
            await user.save();
            res.status(201).json({
                success: true,
                msg: "User registered successfully",
                data: user
            })
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            msg: err.message
        })
    }
}

exports.login = async (req, res) => {
    try{
        const{userName, password} = req.body;
        const user = await User.findOne({userName});

        // verify the password and generate a jwt token if valid
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({userId: user._id}, secretKey)
            res.cookie('token', token);
            res.json({
                success: true,
                msg: "LoggedIn Successfully",
                token,   // sent token for authorization
                user     // for frontend 
            })
        }
        else{
            res.json({
                success: false,
                msg: "Invalid Credentials"
            })
        }
    }   
    catch(err){
        res.json({
            success: false,
            msg: err.message
        })
    }
}

exports.logout = async (req, res) => {

    // clear the token cookie
    res.clearCookie("token")
    .json({
        success: true,
        msg: "Logged Out Successfully"
    })
}