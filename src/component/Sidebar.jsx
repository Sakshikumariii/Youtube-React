import { useSelector } from 'react-redux';
import { IoMdHome,IoMdMusicalNote,IoIosRadio,IoMdSettings} from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions,MdHistory,MdOutlinePlaylistPlay,MdOutlineWatchLater,MdOutlinePodcasts } from "react-icons/md";
import { BiLike,BiSolidMoviePlay,BiLogoDiscourse } from "react-icons/bi";
import { GiGamepad } from "react-icons/gi";
import { RiVideoLine,RiNewspaperLine } from "react-icons/ri";
import { GrShop } from "react-icons/gr";
import { BsPersonSquare } from "react-icons/bs";
import { FaRegFlag, FaRegQuestionCircle, FaRegCommentAlt } from "react-icons/fa";

const sideBarItems = [
  {
    icon: <IoMdHome size={"21px"} />,
    title: "Home"
  },
  {
    icon: <SiYoutubeshorts  size={"21px"} />,
    title: "Shorts"
  },
  {
    icon: <MdOutlineSubscriptions  size={"21px"} />,
    title: "Subscriptions"
  },
];
const sideBarItems2=[
  {
      icon: <BsPersonSquare size={"21px"} />,
      title: "Your Channel"
  },
  {
    icon: <MdHistory size={"21px"} />,
    title: "History"
},
{
  icon: <MdOutlinePlaylistPlay size={"21px"} />,
  title: "Playlist"
},
{
  icon: <RiVideoLine size={"21px"} />,
  title: "Your Video"
},
{
  icon: <MdOutlineWatchLater size={"21px"} />,
  title: "Watch later"
},
{
  icon: <BiLike size={"21px"} />,
  title: "Liked Videos"
},
]
const sideBarItems3=[
  {
    icon: <BiLike size={"21px"} />,
  title: "Trending"
  },
  {
    icon: <GrShop size={"21px"} />,
  title: "Shopping"
  },
  {
    icon: <IoMdMusicalNote  size={"21px"} />,
  title: "Music"
  },
  {
    icon: <BiSolidMoviePlay size={"21px"} />,
  title: "Movies"
  },
  {
    icon: <IoIosRadio  size={"21px"} />,
  title: "Live"
  },
  {
    icon: <GiGamepad  size={"21px"} />,
  title: " Gaming"
  },
  {
    icon: <RiNewspaperLine size={"21px"} />,
  title: "News"
  },
  {
    icon: <BiLogoDiscourse size={"21px"} />,
  title: "Courses"
  },
  {
    icon:<MdOutlinePodcasts size={"21px"}/>,
    title:"Podcasts"
  }
]
const sideBarItems4=[
  {
    icon: <IoMdSettings size={"21px"} />,
    title: "Settings"
  },
  {
    icon: <FaRegFlag size={"21px"} />,
    title: "Report history"
  },
  {
    icon: <FaRegQuestionCircle size={"21px"} />,
    title: "Help"
  },
  {
    icon: <FaRegCommentAlt size={"21px"} />,
    title: "Send feedback"
  }
]




const Sidebar = () => {
  const isOpen = useSelector(state => state.app.open);

  return (
    <>
    <div className={` h-[calc(100vh-4.625rem)]  ${isOpen?'overflow-x-hidden overflow-y-scroll ml-4 pr-4':''}`}>
      {sideBarItems.map((item, index) => (
        <div className={`flex my-2 py-1 ${!isOpen ? 'flex-col items-center ml-0 pr-0 p-0 m-0 my-0 py-1' : ''}`} key={index}>
          {item.icon}
          <p className={`${isOpen ? '' : 'text-xs items-center'}`}>{item.title}</p>
        </div>

      ))}
        <hr className={`${isOpen ? '' : 'hidden'} bg-gray-950`}/>
      <div className={`mt-4 mb-2 text-sm font-sm ${isOpen ? '' : 'hidden'}`}>You</div>
      {sideBarItems2.map((item2, index) => (
       <div className="flex my-2 py-1" key={index}>
         <span className={`${isOpen ? '' : 'hidden'}`}>{item2.icon}</span>
         <p className={`${isOpen ? '' : 'hidden'}`}>{item2.title}</p>
       </div>
     ))}
        <hr className={`${isOpen ? '' : 'hidden'} bg-gray-950`}/>
     <div className={`mt-4 mb-2 text-sm font-sm ${isOpen ? '' : 'hidden'}`}>Explore</div>
      {sideBarItems3.map((item3, index) => (
       <div className="flex my-2 py-1" key={index}>
        <span className={`${isOpen ? '' : 'hidden'}`}>{item3.icon}</span>
         <p className={`${isOpen ? '' : 'hidden'}`}>{item3.title}</p>
       </div>
     ))}
     <hr className={`${isOpen ? '' : 'hidden'} bg-gray-950`}/>
      {
      sideBarItems4.map((item4,index)=>(
        <div className='flex my-2 py-1' key={index}>
          <span className={`${isOpen ? '' : 'hidden'}`}>{item4.icon}</span>
          <p className={`${isOpen ? '' : 'hidden'}`}>{item4.title}</p>
        </div>
      ))
    }
    </div>
   
    
   </>
  );
};

export default Sidebar;