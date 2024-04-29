import Navbar from "./component/Navbar";
import Body from "./component/Body";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WatchVideo from "./component/WatchVideo";
import Feed from "./component/Feed";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/",
        element: <Feed />,
      },
      {
        path: "/watchvideo/:videoId",
        element: <WatchVideo />,
      },
    ],
  },
]);

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="flex mt-16">
        <RouterProvider router={appRouter} />
      </div>
    </div>
  );
}
