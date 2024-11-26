import React, { useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ReplyIcon from '@mui/icons-material/Reply';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Video = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="bg-white mt-[56px] flex text-black py-8 ml-2 justify-center">
      <div className="w-full max-w-[875px] flex flex-col">
        <div className="w-full">
          {/* Static data */}
          <video
            width="400"
            controls
            autoPlay
            className="w-full rounded-[10px]"
          >
            <source src="video.mp4" type="video/mp4" />
            <source src="video.mp4" type="video/webm" />
          </video>
        </div>
        <div className="flex flex-col mt-5">
          <div className="text-[20px] font-bold">Title</div>
          <div className="flex flex-col justify-between mt-2.5">
            <div className="flex  justify-between gap-4">
              <div className="flex flex-row justify-between gap-5">
                <Link
                  to={"/user/898"}
                  className="w-9 h-9 cursor-pointer"
                >
                  <img
                    src=""
                    alt="img.jpg"
                    className="w-full rounded-full"
                  />
                </Link>
                <div className="flex flex-col">
                  <div className="font-medium text-[16px]">
                    Channel Name
                  </div>
                  <div className="text-[14px] text-gray-400">
                    145K subscribers
                  </div>
                </div>
                <div className="bg-black text-white px-4 rounded-full flex justify-center items-center h-9 font-semibold text-[14px]">
                  Subscribe
                </div>
              </div>

              <div className="flex gap-2.5 bg-gray-600/20 justify-center items-center py-2.5 px-2.5 rounded-full cursor-pointer">
                <div className="flex gap-2.5 hover:text-gray-600">
                  <ThumbUpOutlinedIcon />
                  <div className="font-medium">
                    34k
                  </div>
                </div>
                <div className="youtubevideoDivider"></div>
                <div className="flex gap-2.5 hover:text-gray-600">
                  <div className="font-medium">
                    15k
                  </div>
                  <ThumbDownAltOutlinedIcon />
                </div>
                <div className="flex ml-4 mr-2 hover:text-gray-600">
                  <ReplyIcon sx={{fontSize: "30px"}}/>
                </div>
                <div className="flex ml-4 mr-2 hover:text-gray-600">
                  <MoreHorizIcon sx={{fontSize: "30px"}}/>
                </div>
              </div>
            </div>
            <div className="flex flex-col bg-gray-600/20 p-3 rounded-[10px] font-medium text-[14px]  gap-2.5 mt-2.5">
              <div>Created at 21-12-2024</div>
              <div>Description</div>
            </div>
          </div>
          <div className="flex flex-col mt-5 ml-5">
            <div className="text-[20px] font-medium">
              5 Comments
            </div>
            <div className="flex flex-col w-full">
              <img
                src="img.jpg"
                alt=""
                className="video_yotubeSelfCommentProfile"
              />
              <div className="addAComment">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white text-black h-9 border-none text-[16px] border-b border-gray-500 focus:outline-none placeholder:text-[16px]"
                  placeholder="Add a comment"
                />
                <div className="flex justify-end gap-4 mt-2.5">
                  <div className="px-4 py-2 rounded-full border text-black hover:bg-white hover:text-black">
                    Comment
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-5">
              {/* Static data */}
              <div className="flex mt-2.5 gap-2.5">
                <img
                  src="img.jpg"
                  alt=""
                  className="w-9 h-9 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="flex gap-2.5">
                    <div className="text-[14px] font-medium">
                      Channel name
                    </div>
                    <div className="text-[14px] text-gray-400">
                      Created at 24-10-2024
                    </div>
                  </div>
                  {/* Edit comment */}
                  <div className="mt-2.5">
                    Nice video
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[406px] px-3.5 text-black flex flex-col">
        <div className="flex gap-3.5 cursor-pointer">
          <div className="w-[168px] h-[94px]">
            <img
              src="img.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="text-[15px] font-medium mb-1.5">
              Learn Full Stack development using MERN
            </div>
            <div className="text-gray-400 text-[12px]">
              Development
            </div>
            <div className="video_suggestios_About_Profile">
              136k . 1 week ago
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Video;
