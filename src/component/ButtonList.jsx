import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import the icons
import { API_KEY } from "../constant/api";
import { setCategory } from "../utils/appSlice";
import { useDispatch } from "react-redux";

const ButtonList = () => {
  const [buttonList, setButtonList] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a request to the YouTube API to fetch data
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videoCategories?key=${API_KEY}&part=snippet&regionCode=US`
        );
        const data = await response.json();
        // Extract button names from the data
        const categories = data.items.map((item) => item.snippet.title);
        setButtonList(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (scrollOffset) => {
    const newScrollPosition = scrollPosition + scrollOffset;
    setScrollPosition(newScrollPosition >= 0 ? newScrollPosition : 0);
  };
  const videoByTag = (tag) => {
    if (active !== tag) {
      dispatch(setCategory(tag));
      setActive(tag);
    }
  };
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div
        className="flex"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {buttonList.map((buttonName, index) => (
          <button
            key={index}
            onClick={() => {
              videoByTag(buttonName);
            }}
            className={`${
              active === buttonName ? "bg-slate-900 text-white" : "bg-gray-200"
            } px-4 inline-block font-medium mx-1 cursor-pointer py-1 rounded-lg`}
          >
            <span className="whitespace-nowrap">{buttonName}</span>
          </button>
        ))}
      </div>
      <button
        className={`absolute top-0 bottom-0 left-0 bg-gray-50 px-4 font-medium cursor-pointer py-1 rounded-lg ${
          scrollPosition === 0 ? "hidden" : ""
        }`}
        onClick={() => handleScroll(-100)}
      >
        <FiChevronLeft /> {/* Use the left arrow icon */}
      </button>
      <button
        className={`absolute top-0 bottom-0 right-0  bg-gray-50 px-4 font-medium cursor-pointer py-1 rounded-lg ${
          scrollPosition >= buttonList.length * 120 - 500 ? "hidden" : ""
        }`}
        onClick={() => handleScroll(100)}
      >
        <FiChevronRight /> {/* Use the right arrow icon */}
      </button>
    </div>
  );
};

export default ButtonList;
