import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LuSendHorizonal } from "react-icons/lu";
import axios from "axios";
import Avatar from "react-avatar";
import { API_KEY } from "../constant/api";
import LiveChat from "./LiveChat";
import { useDispatch } from "react-redux";
import { setMessage } from "../utils/chatSlice";
import { useSelector } from "react-redux";

const WatchVideo = () => {
  // State variables
  const [input, setInput] = useState("");
  const [singleVideo, setSingleVideo] = useState(null);
  const [channelIcon, setChannelIcon] = useState("");
  const dispatch = useDispatch();

  // Redux selector
  const isOpen = useSelector((state) => state.app.open);

  // Fetch single video data
  const getSingleVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=1000&key=${API_KEY}`
      );
      setSingleVideo(res?.data?.items[0]);

      // Fetch channel details to get channel icon
      const channelId = res?.data?.items[0]?.snippet?.channelId;
      const channelRes = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
      );
      setChannelIcon(
        channelRes?.data?.items[0]?.snippet?.thumbnails?.default?.url
      );
    } catch (err) {
      console.log("Error fetching video:", err);
    }
  };

  // Function to send message
  const sendMessage = () => {
    dispatch(
      setMessage({
        name: "sakshi",
        message: input,
      })
    );
    setInput("");
  };

  // Get videoId from URL params
  const { videoId } = useParams();

  // Fetch video data on component mount
  useEffect(() => {
    getSingleVideo();
  }, []);

  return (
    <div className="ml-5 flex">
      <div>
        {/* Embed YouTube video */}
        <iframe
          width={`${isOpen ? "800" : "900"}`}
          height={`${isOpen ? "430" : "430"}`}
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        {/* Display video title */}
        <h1 className="font-bold text-lg mt-2">
          {singleVideo?.snippet?.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between w-[30%]">
            <div className="flex">
              {/* Display channel icon */}
              <Avatar
                src={channelIcon}
                className="bg-gray-800"
                size={40}
                round={true}
              />
              {/* Display channel title */}
              <h1 className="px-5 text-sm py-3 text-gray">
                {singleVideo?.snippet?.channelTitle}
              </h1>
            </div>
            {/* Subscribe button */}
            <button className="font-bold px-3 py-1 bg-black rounded-full text-white">
              Subscribe
            </button>
          </div>
          {/* Like, Dislike, Share, Download buttons */}
          <div className="flex w-[40%] justify-between">
            <div className="flex items-center cursor-pointer bg-gray-200 px-5 py-2 rounded-full">
              <BiLike size={"20px"} />
              <span>Like</span>
              <span className="">|</span> {/* Add a separator */}
              <BiDislike size={"20px"} />
            </div>
            <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
              <IoIosShareAlt size={"20px"} />
              <span>Share</span>{" "}
            </div>
            <div className="flex items-center cursor-pointer bg-gray-200 px-4 py-2 rounded-full">
              <MdFileDownload size={"20px"} />
              <span>Download</span>
            </div>
          </div>
        </div>
      </div>
      {/* Live chat section */}
      <div className="w-[100%] border border-gray-300 ml-5 rounded-lg h-fit">
      <div className="flex justify-between items-center ml-5">
          <h1>Top Chat</h1>
          <BsThreeDotsVertical />
        </div>
        <div className="overflow-y-auto h-[21.5rem] flex flex-col-reverse">
          {/* Render live chat component */}
          <LiveChat />
        </div>
       
        <div className="flex items-center justify-between border-t ">
          <div className="flex m-2 ">
            <div className="flex items-center">
              {/* Display avatar */}
              <Avatar
                src={channelIcon}
                className="bg-gray-800"
                size={40}
                round={true}
              />
              {/* Message input field */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send message ..."
                className="border-b border-gray-300 outline-none m-2"
              />
              {/* Send message button */}
              <div className="bg-gray-200 cursor-pointer p-2 rounded-full">
                <LuSendHorizonal onClick={sendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
       </div>
  );
};

export default WatchVideo;
