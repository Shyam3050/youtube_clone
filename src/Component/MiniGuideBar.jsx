import React from "react";
import { FaRegCompass } from "react-icons/fa";
import { MdHomeFilled, MdOutlineWatchLater, MdSubscriptions } from "react-icons/md";
import styles from "../Css/MiniGuideBar.module.css"

const MiniGuideBar = () => {
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
        icon: <MdOutlineWatchLater className="text-xl" />,
        name: "Watch Later",
      },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: "Subscriptions",
    },
  ];
  return <div className={styles.miniBar} >
 <ul>
    {mainLinks.map(item => <li className={styles.icon}>{item.icon} <span className={styles.icon_span}>{item.name}</span></li>)}
 </ul>
  </div>;
};

export default MiniGuideBar;
