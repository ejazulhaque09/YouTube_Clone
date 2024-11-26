import React from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SideNavbar from "../components/SideNavbar";

const Profile = ({ sideNavBar }) => {
  return (
  <div className="flex w-full p-2.5 box-border bg-white text-black">
    <SideNavbar sideNavbar={sideNavBar} />
    <h2>nav</h2>
    <div className={sideNavBar ? "flex flex-col overflow-x-hidden flex-1 ml-[270px] mt-[56px] text-black justify-center items-center" : "flex flex-col overflow-x-hidden flex-1 text-black mt-14 justify-center items-center"}>
      <div className="w-full flex pb-5">
        <div className="w-[150px] h-[150px]">
          <img
            src="img.jpg"
            alt="profilePic"
            className="w-full h-full px-2.5"
          />
        </div>
        <div className="flex flex-col gap-2 w-[85%] px-2.5">
          <div className="text-4xl font-semibold">Channel Name</div>
          <div className="text-sm text-gray-500">
            Channel name . 5 Videos
          </div>
          <div className="text-sm text-gray-500">About</div>
        </div>
      </div>
      <div className="profile_videos w-full">
        <div className="text-lg pb-2.5 text-gray-300 font-medium flex items-center border-b border-gray-600">
          Videos &nbsp; <ArrowRightIcon />
        </div>
        <div className="flex gap-2.5 h-screen flex-wrap mt-5">
          {/* Static data */}
          <div>
            <div className="w-[210px] text-black cursor-pointer no-underline">
              <div className="w-full h-[140px]">
                <img
                  src="img.jpg"
                  alt="thumbnail"
                  className="w-full h-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="w-full text-base font-semibold">Title</div>
                <div className="text-sm text-gray-400">
                  Created at 12-02-2024
                </div>
              </div>
            </div>
            <div className="profileVideo_block_menu">
                <MoreVertIcon/>
                {/* Static data */}
                <div className="profileVideo_block_menu_options">
                    <button className="profileVideo_block_menu_option">Edit</button>
                    <button className="profileVideo_block_menu_option">Delete</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};
export default Profile;
