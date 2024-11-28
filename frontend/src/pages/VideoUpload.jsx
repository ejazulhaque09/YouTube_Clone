import React, { useEffect, useState } from "react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const VideoUpload = () => {
  const { videoId } = useParams();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    title: "",
    description: "",
    videoLink: "",
    thumbnail: "",
    category: "",
  });
  const handleOnChangeInput = (e, name) => {
    setInputField({
      ...inputField,
      [name]: e.target.value,
    });
  };
  const uploadImage = async (e, type) => {
    setLoader(true);
    console.log("Uploading");
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "youtube-clone");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dvhaa5sbn/${type}/upload`,
        data
      );
      console.log(response);
      setLoader(false);
      const url = response.data.url;
      let val = type === "image" ? "thumbnail" : "videoLink";
      setInputField({
        ...inputField,
        [val]: url,
      });
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  useEffect(() => {
    let isLogin = localStorage.getItem("userId");
    if (isLogin === null) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (videoId) {
      axios
        .get(`http://localhost:4000/video/getVideoById/${videoId}`)
        .then((res) => {
          const video = res.data.video;
          setInputField({
            title: video.title,
            description: video.description,
            videoLink: video.videoLink,
            thumbnail: video.thumbnail,
            category: video.category,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [videoId]);

  const handleSubmitFunc = async (type) => {
    setLoader(true);
    if (type === "update") {
      try {
        await axios
          .put(`http://localhost:4000/video/video/${videoId}`, inputField, {
            withCredentials: true,
          })
          .then((res) => {
            setLoader(false);
            navigate("/");
            toast.success("Updated Successfully");
          })
          .catch((err) => {
            console.log(err);
            setLoader(false);
          });
      } catch (error) {
        console.log(error)
      }
    }
    else{
        try {
            await axios.post(`http://localhost:4000/video/uploadVideo`, inputField, {withCredentials: true})
            .then((res) =>{
                setLoader(false)
                navigate('/')
                toast.success("Video Uploaded Successfully")
            })
        } catch (error) {
            console.log(error)
            setLoader(false)
        }
    }
  };
  return (
    <div className="h-screen pt-14 w-full flex flex-col items-center bg-white text-black font-normal">
      <div className="h-auto w-[45%] rounded-md mt-5 shadow-md shadow-black p-6">
        <div className="flex w-full justify-center items-center text-[28px]">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red" }} />
          Upload Video
        </div>
        <div className="flex flex-col gap-7 mt-7 items-center">
          <input
            type="text"
            value={inputField.title}
            onChange={(e) => {
              handleOnChangeInput(e, "title");
            }}
            className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md placeholder:text-gray-600"
            placeholder="Title"
          />
          <input
            type="text"
            value={inputField.description}
            onChange={(e) => {
              handleOnChangeInput(e, "description");
            }}
            className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md placeholder:text-gray-600"
            placeholder="Description"
          />
          <input
            type="text"
            value={inputField.category}
            onChange={(e) => {
              handleOnChangeInput(e, "category");
            }}
            className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md placeholder:text-gray-600"
            placeholder="Category"
          />
          <div>
            Thumbnail{" "}
            <input
              type="file"
              onChange={(e) => uploadImage(e, "image")}
              className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md"
              accept="image/*"
            />{" "}
          </div>
          <div>
            Video{" "}
            <input
              type="file"
              onChange={(e) => uploadImage(e, "video")}
              className="w-[70%] h-[45px] px-5 text-[16px] text-black bg-gray-200 border-none rounded-md"
              accept="video/mp4, video/webm, video/*"
            />{" "}
          </div>
          {loader && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
        <div className="flex gap-7 justify-center mt-7">
          <div onClick={handleSubmitFunc} className="px-5 py-2.5 border text-[18px] font-medium rounded-md text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400">
            Upload
          </div>
          <Link
            to={"/"}
            className="px-5 py-2.5 border text-[18px] font-medium rounded-md text-black bg-gray-200 border-black cursor-pointer hover:bg-gray-400"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
