// components/VideoContainer.js
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setHomeVideo } from "../utils/appSlice";
import { API_KEY } from "../constant/api";
import VideoCart from "./VideoCart";

const VideoContainer = () => {
  const { video, category } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.open);
  const fetchYoutubeVideo = async () => {
    try {
      const res = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${category}&key=${API_KEY}`
      );
      dispatch(setHomeVideo(res?.data?.items));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (category === "All") {
      fetchYoutubeVideo();
    } else {
      fetchYoutubeVideo();
    }
  }, [category]);

  return (
    <div className={`grid ${isOpen ? "grid-cols-3" : "grid-cols-4"}  gap-3`}>
      {video.map((item, itemIndex) => (
        <Link
          to={`/watchvideo/${
            typeof item.id === "object" && item.id.videoId
              ? item.id.videoId
              : item.id
          }`}
          key={itemIndex}
        >
          <VideoCart
            itemId={item.id.videoId}
            key={typeof item.id === "object" ? item.id.videoId : item.id}
          />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
