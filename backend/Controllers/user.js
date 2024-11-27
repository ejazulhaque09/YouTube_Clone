const User = require('../Models/user')
const bcrypt = require('bcryptjs') 
const jwt = require('jsonwebtoken')
require('dotenv').config;
const secretKey = process.env.SECRET_KEY

exports.signup = async (req, res) => {
    try{
        const {channelName, userName, about, password, profilePic} = req.body;
        const isExist = await User.findOne({userName})

        if(isExist){
            res.status(400).json({
                success: false,
                msg: "Username Already Exists"
            })
        }
        else{
            let hashedPass = await bcrypt.hash(password, 10);
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
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({userId: user._id}, secretKey)
            res.cookie('token', token);
            res.json({
                success: true,
                msg: "LoggedIn Successfully",
                token,
                user
            })
        }
        else{
            res.status({
                success: false,
                msg: "Invalid Credentials"
            })
        }
    }   
    catch(err){
        res.status({
            success: false,
            msg: err.message
        })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("token")
    .json({
        success: true,
        msg: "Logged Out Successfully"
    })
}