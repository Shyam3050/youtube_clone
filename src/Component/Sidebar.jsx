import React from "react";
import styles from "../Css/SideBar.module.css";
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { TbMusic, TbDeviceGamepad2 } from "react-icons/tb";
import { FaRegCompass } from "react-icons/fa";
import { GiFilmStrip, GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDispatch , useSelector} from "react-redux";
import { sideBarVisibilityUpdate } from "../store";
import { logout } from "../store";

const Sidebar = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken )

  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-xl" />,
      name: "Home",
    },
    {
      icon: <FaRegCompass className="text-xl" />,
      name: "Explore",
    },
    {
      icon: <MdOutlineSlowMotionVideo className="text-xl" />,
      name: "Shorts",
    },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: "Subscriptions",
    },
  ];

  const secondaryLinks = [
    {
      icon: <MdOutlineVideoLibrary className="text-xl" />,
      name: "Library",
    },
    {
      icon: <MdHistory className="text-xl" />,
      name: "History",
    },
    {
      icon: <MdOutlineSmartDisplay className="text-xl" />,
      name: "Your Videos",
    },
    {
      icon: <MdOutlineWatchLater className="text-xl" />,
      name: "Watch Later",
    },
    {
      icon: <MdThumbUpOffAlt className="text-xl" />,
      name: "Liked Videos",
    },
  ];

  const subscriptionLinks = [
    {
      icon: <TbMusic className="text-xl" />,
      name: "Music",
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: "Sport",
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: "Gaming",
    },
    {
      icon: <GiFilmStrip className="text-xl" />,
      name: "Films",
    },
  ];

  const helpLinks = [
    {
      icon: <MdSettings className="text-xl" />,
      name: "Settings",
    },
    {
      icon: <MdOutlinedFlag className="text-xl" />,
      name: "Report history",
    },
    {
      icon: <MdOutlineHelpOutline className="text-xl" />,
      name: "Help",
    },
    {
      icon: <MdOutlineFeedback className="text-xl" />,
      name: "Send feedback",
    },
  ];

  const textLinks = [
    [
      "About",
      "Press",
      "Copyright",
      "Contact us",
      "Creator",
      "Advertise",
      "Developers",
    ],
    [
      "Terms",
      "Privacy",
      "Policy & Safety",
      "How YouTube works",
      "Test new features",
    ],
  ];

  return (
    <div className={styles.SidebarBackground}>
      <div
        style={{ width: "262px", height: "100%" }}
        className="  bg-[#212121] pr-5 overflow-y-scroll pb-8 sidebar"
      >
        <div className="flex gap-8 items-center text-2xl h-14 pl-6">
          <div
            className="cursor-pointer"
            onClick={() => dispatch(sideBarVisibilityUpdate())}
          >
            <GiHamburgerMenu />
          </div>
          <Link to="/">
            <div className="flex items-center justify-center">
              <BsYoutube className=" text-3xl text-red-600 " />
              <span className="text-xl font-medium">YouTube</span>
            </div>
          </Link>
        </div>
        <ul className="flex flex-col border-b-2 border-gray-900">
          {mainLinks.map(({ icon, name }) => {
            return (
              <li
                key={name}
                className={`pl-6 py-3 hover:bg-zinc-600 ${
                  name === "Home" ? "bg-slate-700" : ""
                }`}
              >
                <a href="#" className="flex items-center gap-5">
                  {icon}
                  <span className="text-sm tracking-wider">{name}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col border-b-2 border-gray-900">
          {secondaryLinks.map(({ icon, name }) => {
            return (
              <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
                <a href="#" className="flex items-center gap-5">
                  {icon}
                  <span className="text-sm tracking-wider">{name}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="flex flex-col border-b-2 border-gray-700">
          {subscriptionLinks.map(({ icon, name }) => {
            return (
              <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
                <a href="#" className="flex items-center gap-5">
                  {icon}
                  <span className="text-sm tracking-wider">{name}</span>
                </a>
              </li>
            );
          })}
        { accessToken && <li
            className={`pl-6 py-3 hover:bg-zinc-600 `}
            onClick={() => dispatch(logout())}
          >
            <a href="#" className="flex items-center gap-5">
              <BiLogOut className="text-xl" />
              <span className="text-sm tracking-wider">Logout</span>
            </a>
          </li>}
        </ul>
        <ul className="flex flex-col border-b-2 border-gray-700">
          {helpLinks.map(({ icon, name }) => {
            return (
              <li key={name} className={`pl-6 py-3 hover:bg-zinc-600 `}>
                <a href="#" className="flex items-center gap-5">
                  {icon}
                  <span className="text-sm tracking-wider">{name}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
          {textLinks[0].map((name) => {
            return (
              <li key={name} className="cursor-pointer">
                {name}
              </li>
            );
          })}
        </ul>
        <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
          {textLinks[1].map((name) => {
            return (
              <li key={name} className="cursor-pointer">
                {name}
              </li>
            );
          })}
        </ul>
        <span className="px-4 text-sm text-zinc-400">&copy; 2022 Google</span>
        <br />
        <p className="px-4 pt-3 text-sm text-zinc-400">
          This clone is for educational purpose only.
        </p>
      </div>
      <div
        className={styles.sidecContainer}
        onClick={() => dispatch(sideBarVisibilityUpdate())}
      ></div>
    </div>
  );
};

export default Sidebar;
