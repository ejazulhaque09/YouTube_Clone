import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import YouTubeIcon from "@mui/icons-material/YouTube";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import VideoCallIcon from "@mui/icons-material/VideoCall";
import Notification from '@mui/icons-material/Notifications'
import { useState } from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
// import './Navbar.css'

const Navbar = ({setSideNavbarFunc, sideNavbar}) => {
    const [userPic, setUserPic] = useState('https://tse1.mm.bing.net/th?id=OIP.Nykv6l7QXIo0lDbQvybBqQAAAA&pid=Api&P=0&h=180')
    const [navbarModal, setNavbarModal] = useState(false)
    const [login, setLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();

    const handleClickModal = () => {
      setNavbarModal((prev) => !prev)
    }
    const sideNavbarFunc = () => {
      setSideNavbarFunc(!sideNavbar);
    }
    const handleProfile = () => {
      navigate('/user/534');
      setNavbarModal(false)
    }
    const setLoginModal = ()=> {
      setLogin(false);
    }
    const onClickPopUpOption = (button) => {
      setNavbarModal(false);
      if(button ==='login'){
        setLogin(true);
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
        setTimeout(() => {
          navigate('/')
          window.location.reload();
        }, 2000)
      }
    }


  return (
    <div className="fixed top-0 w-full bg-white flex items-center justify-between px-4 z-10">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center cursor-pointer " onClick={sideNavbarFunc} >
          <MenuIcon sx={{color: "black"}}/>
        </div>
        <Link to={'/'} className="flex items-center gap-2 text-black no-underline">
          <YouTubeIcon
            sx={{ fontSize: "34px" }}
            className="text-red-500"
          />
          <div className="text-xl font-semibold font-sans" >Youtube</div>
        </Link>
      </div>

      <div className="flex gap-2 w-1/2">
        <div className="flex w-4/5">
            <input type="text" placeholder="Search" className="w-full h-10 rounded-l-full border border-gray-300 bg-white text-black px-4 focus:outline-none placeholder:text-gray-400 text-base"/>
            <div className="w-16 h-10 flex items-center justify-center bg-gray-100 border border-gray-300 rounded-r-full cursor-pointer hover:bg-gray-300">
                <SearchIcon sx={{fontSize: "29px", color: "black"}}/>
            </div>
        </div>
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer hover:bg-gray-300">
            <KeyboardVoiceIcon sx={{color: "black "}} />
        </div>
      </div>
      <div className="right flex gap-5 items-center relative">
        {/* static */}
        <Link to={'/2345/upload'}>
            <VideoCallIcon sx={{fontSize: "30px", cursor: "pointer", color:"black"}} />
        </Link>
        <Notification sx={{fontSize: "30px", cursor: "pointer", color:"black"}}/>
        <img onClick={handleClickModal} src={userPic} alt="logo" className="right-logo w-8 h-8 rounded-full cursor-pointer" />
        {navbarModal && (
        <div className="border-black border-2 absolute top-10 w-full rounded-sm z-20 text-black">
            {isLoggedIn && <div className="border-b border-black bg-white p-2 cursor-pointer hover:bg-gray-300" onClick={()=> handleProfile()}>Profile</div>}
            {isLoggedIn && <div className="border-b border-black bg-white p-2 cursor-pointer hover:bg-gray-300" onClick={()=> onClickPopUpOption('logout')}>Logout</div>}
            {!isLoggedIn && <div className="bg-white p-2 cursor-pointer hover:bg-gray-300" onClick={()=> onClickPopUpOption('login')}>Login</div>}
        </div>
        )}
      </div>
      {login && <Login setLoginModal={setLoginModal}/>}
    </div>
  );
};
export default Navbar;