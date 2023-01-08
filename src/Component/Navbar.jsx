import React, { useState } from "react";
import styles from "./componentCss/Navbar.module.css";
import User from "./UI/user.png";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";
import { IoAppsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  clearSearchPageVideo,
  changeSearchTerm,
  clearSearchTerm,
  sideBarVisibilityUpdate,
  setSearchBarVisibility,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideo";
import SerachBarMobile from "./UI/SerachBarMobile";

const Navbar = () => {
  const [search_bar, setSearch_bar] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.youtube_clone.searchTerm);
  const searchBar = useSelector((state) => state.UI.searchBar);

  function searchHandler(e) {
    e.preventDefault();
    if (location.pathname !== "/search") {
      navigate("/search");
    } else {
      dispatch(setSearchBarVisibility());
      dispatch(clearSearchPageVideo());
      dispatch(getSearchPageVideos());
    }
  }

  function searchBar_render() {
    setSearch_bar((state) => !state);
  }

  console.log(search_bar);
  const nav_end_profile = (
    <div className={`${styles.end}`}>
      <div className="text-xl p-2 ml-3">
        <BsCameraVideo />
      </div>
      <div className="relative ">
        <BsBell className="text-xl ml-2" />
        <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
          9+
        </span>
      </div>
      <div className={`${styles.user}` + " ml-2"}>
        <img src={User} alt="user-logo" className="img_w_100 " />
      </div>
    </div>
  );

  const sign_in = <button className={`${styles.sign_in}`}>Sign-in</button>;

  return (
    <>
      <nav className={`${styles.navbar}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.start}`}>
            <div
              className={`${styles.back} ${
                search_bar ? " visible" : " hidden"
              } `} onClick = {() => searchBar_render()}
            >
              <BiArrowBack />
            </div>
            <div
              className={`${styles.menubar}  ${
                search_bar ? " hidden" : " visible"
              }`}
              onClick={() => dispatch(sideBarVisibilityUpdate())}
            >
              <GiHamburgerMenu />
            </div>
            <Link to="/" className={` ${search_bar ? " hidden" : " visible"}`}>
              <div className={`${styles.youtube_logo}`}>
                <div className={`${styles.icon}`}>
                  <BsYoutube />
                </div>
                <span className={`${styles.icon_text}`}>YouTube</span>
              </div>
            </Link>
          </div>
          <div className={`${styles.center}`}>
            <div
              className={`${styles.input_container}  ${
                search_bar ? " visible" : " hidden"
              } `}
            >
              <form className="">
                <div className="w-full flex justify-end items-center ">
                  <input type="text" className={`${styles.input}`} />
                  <div className={`${styles.close}`}>
                    <AiOutlineClose
                      className={`text-xl cursor-pointer  ${
                        searchTerm ? "visible " : "visible"
                      }`}
                      onClick={() => dispatch(clearSearchTerm())}
                    />
                  </div>

                  <button className={`${styles.search_btn}`}>
                    <AiOutlineSearch className="text-2xl " />
                  </button>
                </div>
              </form>
            </div>

            <div
              className={` ${search_bar ? " hidden" : " visible"}`}
              onClick={() => searchBar_render()}
            >
              <AiOutlineSearch className="text-2xl cursor-pointer" />
            </div>
            <div
              className={
                ` ${search_bar ? " hidden" : " visible"}` +
                "   text-xl p-2 ml-3 bg-zinc-900 rounded-full "
              }
            >
              <TiMicrophone />
            </div>
          </div>
          <div className={`${styles.end}`}>{sign_in}</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
