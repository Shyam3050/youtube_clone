import React from "react";
import { FaRegCompass } from "react-icons/fa";
import { MdHomeFilled, MdOutlineWatchLater, MdSubscriptions } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import styles from "../Css/MiniGuideBar.module.css"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store";

const MiniGuideBar = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(state => state.auth.accessToken);
  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-2xl" />,
      name: "Home",
    },
    {
      icon: <FaRegCompass className="text-2xl" />,
      name: "Explore",
    },
    {
        icon: <MdOutlineWatchLater className="text-2xl" />,
        name: "Watch Later",
      },
    {
      icon: <MdSubscriptions className="text-2xl" />,
      name: "Subscriptions",
    },
  ];
 
  return <div className={styles.miniBar} >
 <ul>
    {mainLinks.map(item => <li key={item.name} className={styles.icon}>{item.icon} <span className={styles.icon_span}>{item.name}</span></li>)}
   {accessToken && <li  className={styles.icon}><BiLogOut className="text-2xl" onClick={() => dispatch(logout())}/> <span className={styles.icon_span}>Logout</span></li>}
 </ul>
  </div>;
};

export default MiniGuideBar;
