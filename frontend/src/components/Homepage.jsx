import React from "react";
import { Link } from "react-router-dom";

const Homepage = ({sideNavbar}) => {
    const options = [
        "All",
        "Twenty20 Cricket",
        "Music",
        "Live",
        "Mixes",
        "Gaming",
        "Debates",
        "Coke Studio",
        "Comedy",
        "Programming",
    ]
    return(
        <div className={sideNavbar ? "flex flex-col z-0 opacity-50 flex-1 min-h-screen" : "flex-col h-screen flex-1"}>
            <div className="flex fixed top-[56px] right-35 left-20 z-[10] box-border gap-2 flex-shrink-0 h-auto overflow-x-hidden overflow-y-hidden bg-white">
                {options.map((item, index) => {
                    return(
                        <div key={index} className="flex-shrink-0 flex-col basis-auto flex-grow-0 h-[30px] px-[10px] bg-gray-300 text-black font-semibold rounded-md flex justify-center items-center cursor-pointer">
                            {item}
                        </div>
                    )
                })}
            </div>

            <div className="grid ml-10 bg-white box-border gap-[10px] grid-cols-[384px_384px_384px] pt-[90px] pb-[20px] h-screen">
                {/* static data */}
                <Link to={'/watch/343'} className="flex flex-col box-border cursor-pointer h-[216px] text-black no-underline">
                    <div className="w-full h-[216px] box-border relative">
                        <img src="img.jpg" alt="Thumbnail" className="w-full h-full rounded-md" />
                        <div className="absolute bottom-0 right-0 px-1 py-0.5 bg-gray-500 rounded-sm text-white">34.10</div>
                    </div>
                    <div className="flex pt-2.5">
                        <div className="w-[50px] flex items-center justify-center">
                            <img src="img.jpg" alt="profile" className="w-4/5 rounded-full" />
                        </div>
                        <div className="flex flex-col w-full p-1.5 box-border">
                            <div className="font-semibold text-lg">Hello</div>
                            <div className="text-lg text-gray-500 mt-1 ">ChannelName</div>
                            <div className="text-sm text-gray-500 ">45K views</div>
                        </div>
                    </div>
                </Link>


                
                <Link to={'/watch/343'} className="youtube_video flex flex-col box-border cursor-pointer h-[216px] text-black no-underline">
                    <div className="youtube_thumbnailBox w-full h-[216px] box-border relative">
                        <img src="img.jpg" alt="Thumbnail" className="youtube_thumbnailPic w-full h-full rounded-md" />
                        <div className="youtube_timingThumbnail absolute bottom-0 right-0 px-1 py-0.5 bg-gray-500 rounded-sm text-white">34.10</div>
                    </div>
                    <div className="youtube_titleBox flex pt-2.5">
                        <div className="yutubeTitleBoxProfile w-[50px] flex items-center justify-center">
                            <img src="img.jpg" alt="profile" className="youtube_thumbnail_Profile w-4/5 rounded-full" />
                        </div>
                        <div className="youtubeTitleBox_Title flex flex-col w-full p-1.5 box-border">
                            <div className="youtube_videoTitle font-semibold text-lg">Hello</div>
                            <div className="youtube_channelName text-lg text-gray-500 mt-1 ">ChannelName</div>
                            <div className="youtubeVideo_views text-sm text-gray-500 ">45K views</div>
                        </div>
                    </div>
                </Link>


                
                <Link to={'/watch/343'} className="youtube_video flex flex-col box-border cursor-pointer h-[216px] text-black no-underline">
                    <div className="youtube_thumbnailBox w-full h-[216px] box-border relative">
                        <img src="img.jpg" alt="Thumbnail" className="youtube_thumbnailPic w-full h-full rounded-md" />
                        <div className="youtube_timingThumbnail absolute bottom-0 right-0 px-1 py-0.5 bg-gray-500 rounded-sm text-white">34.10</div>
                    </div>
                    <div className="youtube_titleBox flex pt-2.5">
                        <div className="yutubeTitleBoxProfile w-[50px] flex items-center justify-center">
                            <img src="img.jpg" alt="profile" className="youtube_thumbnail_Profile w-4/5 rounded-full" />
                        </div>
                        <div className="youtubeTitleBox_Title flex flex-col w-full p-1.5 box-border">
                            <div className="youtube_videoTitle font-semibold text-lg">Hello</div>
                            <div className="youtube_channelName text-lg text-gray-500 mt-1 ">ChannelName</div>
                            <div className="youtubeVideo_views text-sm text-gray-500 ">45K views</div>
                        </div>
                    </div>
                </Link>


                
            </div>
        </div>
    )
}
export default Homepage;