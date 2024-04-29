// import React from 'react'
import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const Feed = () => {
  const isOpen = useSelector((state) => state.app.open);
  const feedWidth = isOpen ? "w-[27%]" : "w-[30%]"; // Calculate width dynamically

  return (
    <div className={`ml-5 mr-5 ${feedWidth}`}>
      <ButtonList />
      <VideoContainer />
    </div>
  );
};

export default Feed;
