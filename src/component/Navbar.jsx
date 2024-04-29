// import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setSearchSuggestion,
  toggleSidebar,
} from "../utils/appSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../assets/logo2.png";
import avatar from "../assets/avatar.jpg";
import Avatar from "react-avatar";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiVideoOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { SEARCH_SUGGESTION_API } from "../constant/api";
import axios from "axios";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [suggestion, setSeggestion] = useState(false);
  const dispatch = useDispatch();
  const { searchSuggestion } = useSelector((store) => store.app);

  const toggleHandler = () => {
    dispatch(toggleSidebar());
  };
  const searchVideo = () => {
    if (input.trim() !== "") {
      dispatch(setCategory(input));
      setInput("");
      setSeggestion(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchVideo();
      setSeggestion(false); // Reset suggestion state
    }
  };

  const showSearchSuggestion = async () => {
    try {
      const res = await axios.get(SEARCH_SUGGESTION_API + input);
      // console.log(res.data[1]);
      dispatch(setSearchSuggestion(res?.data[1]));
    } catch (err) {
      console.log(err);
    }
  };
  const openSuggestion = () => {
    if (input.trim() !== "") {
      setSeggestion(true);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      showSearchSuggestion();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return (
    <div className="flex fixed top-0 justify-center items-center w-[100%] z-10 bg-white">
      <div className="flex w-[100%] items-center justify-between px-5 ">
        <div className="flex items-center">
          <GiHamburgerMenu onClick={toggleHandler} size={"22px"} />
          <img src={Logo} width={"100px"} alt="logo" className="px-1" />
        </div>
        <div className="flex w-[40%] items-center">
          <div className="w-[100%] border px-4 py-1 rounded-l-full  border-gray-400">
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none "
              value={input}
              onKeyPress={handleKeyPress}
              onChange={(e) => {
                setInput(e.target.value);
                openSuggestion();
              }}
            />
          </div>
          <button className="py-1 px-4 border rounded-r-full border-gray-400">
            <CiSearch size={"24px"} onClick={searchVideo} />
          </button>
          {suggestion && suggestion.length !== 0 && (
            <div className="absolute top-3 z-50 w-[40%] p-4 bg-white shadow-lg mt-12 rounded-lg border border-gray-200">
              <ul>
                {searchSuggestion.map((text, textIndex) => {
                  return (
                    <div className="flex items-center" key={textIndex}>
                      <CiSearch size={"24px"} onClick={searchVideo} />
                      <li className="px-1 py-1 cursor-pointer text-md font-medium">
                        {text}
                      </li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center w-[9%] justify-between">
          <CiVideoOn size={"22px"} className="cursor-pointer" />
          <IoIosNotificationsOutline size={"22px"} className="cursor-pointer" />
          <Avatar src={avatar} size={25} round={true} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
