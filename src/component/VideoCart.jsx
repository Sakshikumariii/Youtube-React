import { useEffect, useState } from 'react';
import Avatar from "react-avatar";
import axios from "axios";
import { API_KEY } from "../constant/api";

const VideoCart = ({ itemId }) => { // Passing itemId instead of item
  const [videoItem, setVideoItem] = useState(null);
  const [youtubeIcon, setYoutubeIcon] = useState("");

  const fetchVideoDetails = async () => {
    try {
      const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${itemId}&key=${API_KEY}`);
      setVideoItem(res.data.items[0]);
      setYoutubeIcon(res.data.items[0]?.snippet?.thumbnails?.high?.url);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchVideoDetails();
  }, [itemId]);

  if (!videoItem) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="pt-5 w-90 cursor-pointer">
      <img src={videoItem.snippet.thumbnails.medium.url} className="w-[100%] rounded-xl" alt="" />
      <div>
        <div className="flex mt-2">
          <Avatar src={youtubeIcon} size={40} round={true} /> {/* Set Avatar size here */}
          <div className="ml-2">
            <h1 className="font-bold">{videoItem.snippet.title}</h1>
            <p className="text-sm text-gray-700">{videoItem.snippet.channelTitle}</p>
            <span className="text-sm flex text-gray-900 ">
              {videoItem.statistics.viewCount} views
            </span>
            <div className="text-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCart;
