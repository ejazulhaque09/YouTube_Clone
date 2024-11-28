import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const Login = ({setLoginModal}) => {
    const [loader, setLoader] = useState(false);
    const [loginField, setLoginField] = useState({
        userName: '',
        password: ''
    })
    const handleOnChangeInput = (e, name) => {
        setLoginField({
            ...loginField,
            [name]: e.target.value,
        })
    }

    const handleLoginFunc = async () => {
        setLoader(true);
        console.log("calling api")
        console.log(loginField)
        axios.
        post('http://localhost:4000/auth/login', loginField, {
            withCredentials: true
        })
        .then((res) => {
            console.log("Api called")
            console.log(res)
            setLoader(false);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user._id);
            localStorage.setItem("profilePic", res.data.user.profilePic);
            window.location.reload();
        }).catch((err) => {
            toast.error("Invalid Credential")
            console.log(err)
            setLoader(false);
        })
    }
    
    return(
        <div className="fixed inset-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center text-black">
            <div className="w-2/5 h-3/5 mt-24 bg-white box-border p-16 flex flex-col items-center shadow-lg shadow-black">
                <div className="titleCard_login flex items-center gap-2 text-2xl font-medium">
                    <YouTubeIcon sx ={{fontSize: "54px"}} className="text-red-600"/>
                    Login
                </div>
                <div className="flex flex-col gap-8 mt-6 w-full items-center">
                    <div className="userNameLogin">
                        <input type="text" className="w-auto h-12 text-black px-3 bg-gray-200 border-none rounded-md placeholder:text-gray-600"  placeholder="UserName" value={loginField.userName} onChange={(e) => handleOnChangeInput(e, 'userName')}/>
                    </div>
                    <div className="userNameLogin">
                        <input type="password" className="w-auto h-12 text-black px-3 bg-gray-200 border-none rounded-md placeholder:text-gray-600" placeholder="Password" value={loginField.password} onChange={(e) => handleOnChangeInput(e, 'password')}/>
                    </div>
                </div>
                <div className="w-3/5 flex justify-between mt-6">
                    <div onClick={handleLoginFunc} className=" w-auto px-2 h-9 border text-center flex justify-center items-center rounded-md text-lg font-semibold hover:text-black bg-gray-200 border-black cursor-pointer  hover:bg-gray-400">
                        Login
                    </div>
                    <Link to={'/signup'} className='w-auto px-2 mx-4 h-9 border text-center flex justify-center items-center rounded-md text-lg font-semibold hover:text-black bg-gray-200 border-black cursor-pointer  hover:bg-gray-400' onClick={() => setLoginModal()}> SignUp</Link>
                    <div className=" w-auto px-2 h-9 border text-center flex justify-center items-center rounded-md text-lg font-semibold hover:text-black bg-gray-200 border-black cursor-pointer  hover:bg-gray-400" onClick={() => setLoginModal()}> Cancel</div>
                </div>
                {loader && (
                <Box sx={{width: '100%' }}>
                    <LinearProgress/>
                </Box>
                )}
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Login;