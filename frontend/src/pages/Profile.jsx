import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SideNavbar from "../components/SideNavbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Profile = ({ sideNavBar }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(null);
  const fetchProfileData = async () => {
    axios
      .get(`http://localhost:4000/video/${id}/channel`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  const handlEdit = (videoId) => {
    navigate(`//${videoId}/edit`);
  };
  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`http://localhost:4000/video/video/${videoId}`, {
        withCredentials: true,
      });
      setData(data.filter((video) => video._id !== video));
    } catch (err) {
      console.log(err);
    }
  };
  const toggleMenu = (index) => {
    setMenuOpen(menuOpen === index ? null : index);
  };
  return (
    <div className="flex w-full p-2.5 box-border bg-white text-black">
      <SideNavbar sideNavbar={sideNavBar} />
      <h2>nav</h2>
      <div
        className={
          sideNavBar
            ? "flex flex-col overflow-x-hidden flex-1 ml-[270px] mt-[56px] text-black justify-center items-center"
            : "flex flex-col overflow-x-hidden flex-1 text-black mt-14 justify-center items-center"
        }
      >
        <div className="w-full flex pb-5">
          <div className="w-[150px] h-[150px]">
            <img
              src={user?.profilePic}
              alt="profilePic"
              className="w-full h-full px-2.5"
            />
          </div>
          <div className="flex flex-col gap-2 w-[85%] px-2.5">
            <div className="text-4xl font-semibold">{user?.channelName}</div>
            <div className="text-sm text-gray-500">
              {console.log(data)}
              {user?.channelName} . {data?.length} videos
            </div>
            <div className="text-sm text-gray-500">{user?.about}</div>
          </div>
        </div>
        <div className="profile_videos w-full">
          <div className="text-lg pb-2.5 text-gray-300 font-medium flex items-center border-b border-gray-600">
            Videos &nbsp; <ArrowRightIcon />
          </div>
          <div className="flex gap-2.5 h-screen flex-wrap mt-5">
            {data.map((item, index) => {
              return (
                <div>
                  <Link to={`/watch/${item._id}`} className="w-[210px] text-black cursor-pointer no-underline">
                    <div className="w-full h-[140px]">
                      <img
                        src="img.jpg"
                        alt="thumbnail"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="w-full text-base font-semibold">
                        Title
                      </div>
                      <div className="text-sm text-gray-400">
                        Created at 12-02-2024
                      </div>
                    </div>
                  </Link>
                  <div className="profileVideo_block_menu">
                    <MoreVertIcon onClick={() => toggleMenu(index)} />
                    {/* Static data */}
                    <div className="profileVideo_block_menu_options">
                      <button
                        className="profileVideo_block_menu_option"
                        onClick={() => handlEdit(item?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="profileVideo_block_menu_option"
                        onClick={() => handleDelete(item?._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
