import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinearProgress from "@mui/material/LinearProgress";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import axios from 'axios'
const Signup = () => {
    const [uploadImageUrl, setUpLoadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain")
    const [progressBar, setProgressBar] = useState(false)
    const [signUpField, setSignUpField] = useState({
        channelName: "",
        userName: "",
        password: "",
        about: "",
        profilePic: uploadImageUrl
    })
    const handleInputField = (e, name) =>{
        setSignUpField({
            ...signUpField,
            [name]: e.target.value,
        })
    }
    const uploadImage = async (e) => {
        console.log("uploading");
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'youtube-clone');
        try{
            // cloudName="dvhaa5sbn"
            setProgressBar(true);
            const response = await axios.post("https://api.cloudinary.com/v1_1/dvhaa5sbn/image/upload", data)
            setProgressBar(false);
            const imageUrl = response.data.url;
            console.log(imageUrl)
            setUpLoadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField,
                profilePic: imageUrl
            })
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="mt-[56px] text-black w-full flex flex-col items-center h-screen bg-white">
            <div className="w-[2/5] border p-4 mt-7 flex flex-col items-center justify-center shadow-md shadow-black">
                <div className="flex gap-5 w-full justify-center items-center font-light text-2xl">
                    <YouTubeIcon sx={{fontSize: "54px", color:"red"}}/>
                    SignUp
                </div>
                <div className="flex flex-col gap-5 w-full items-center mt-7">
                    <input type="text" value={signUpField.channelName} onChange={(e) => {handleInputField(e, 'channelName')}} className="w-3/5 h-11 text-black px-2.5 bg-gray-200  rounded-md placeholder:text-gray-600" placeholder="Channel Name" />
                    <input type="text" value={signUpField.userName} onChange={(e) => {handleInputField(e, 'userName')}} className="w-3/5 h-11 text-black px-2.5 bg-gray-200 rounded-md border-none placeholder:text-gray-600" placeholder="User Name" />
                    <input type="password" value={signUpField.password} onChange={(e) => {handleInputField(e, 'password')}} className=" w-3/5 h-11 text-black px-2.5 bg-gray-200 rounded-md border-none placeholder:text-gray-600" placeholder="Password" />
                    <input type="text" value={signUpField.about} onChange={(e) => {handleInputField(e, 'about')}} className="w-3/5 h-11 text-black px-2.5 bg-gray-200 rounded-md border-none placeholder:text-gray-600" placeholder="About your channel" />
                    <div className="flex gap-7 mt-5">
                        <input type="file" onChange={(e) => uploadImage(e)}/>
                        <div className="w-24 h-24">
                            <img src={uploadImageUrl} alt="" className="w-full rounded-full"/>
                        </div>
                    </div>
                    <div className="flex items-center gap-7 justify-center w-full mt-5">
                        <div className="px-2.5 py-2 text-lg font-medium rounded-md border text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400">SignUp</div>
                        <Link to={'/'} className="px-2.5 py-2 text-lg font-medium rounded-md border text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400">Home Page</Link>
                    </div>
                    {progressBar && (
                        <Box sx={{width: '100%'}}>
                            <LinearProgress/>
                        </Box>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Signup;