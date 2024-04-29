// import React from 'react'
import { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setMessage } from "../utils/chatSlice";
import { generateRandomName, generateRandomMessage } from "../utils/data";

const LiveChat = () => {
  const message = useSelector((store) => store.chat.message);
  const dispatch = useDispatch();

  // useEffect to dispatch new messages at regular intervals
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(
        setMessage({
          name: generateRandomName(),
          message: generateRandomMessage(20), // Adjust message length as needed
        })
      );
    }, 500);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(timer);
  }, [dispatch]); // Add dispatch as a dependency

  return (
    <div className=" px-2 py-2">
      <div>
        {message.map((item, idx) => {
          return (
            <div key={idx}>
              <ChatMessage item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveChat;
