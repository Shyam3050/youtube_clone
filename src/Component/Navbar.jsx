import React, { useState } from "react";
import styles from "./componentCss/Navbar.module.css";
import User from "./UI/user.png";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  clearSearchPageVideo,
  changeSearchTerm,
  clearSearchTerm,
  sideBarVisibilityUpdate,
  
} from "../store";
import { authentication } from "../store/reducers/authentication";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideo";


const Navbar = () => {
  const [search_bar, setSearch_bar] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.youtube_clone.searchTerm);
  const {accessToken, user} = useSelector(state => state.auth)
  
  
  function searchHandler(e) {
    e.preventDefault();
    if(!searchTerm) {
      return;
    }
    if (location.pathname !== "/search") {
      navigate("/search");
    } else {
      dispatch(clearSearchPageVideo());
      dispatch(getSearchPageVideos());
    }
  }

  function searchBar_render() {
    setSearch_bar((state) => !state);
  }



  const nav_end_profile = (
    <div className={`${styles.end}`}>
      <div className="text-xl p-2 ml-3 tablet:hidden">
        <BsCameraVideo />
      </div>
      <div className="relative ">
        <BsBell className="text-xl ml-2" />
        <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
          9+
        </span>
      </div>
      <div className={`${styles.user}`}>
        <img src={user.profilePictureUrl} alt="user-logo" className="img_w_100 " />
      </div>
    </div>
  );

  const sign_in = <button className={`${styles.sign_in}`} onClick = {() => dispatch(authentication())}>Sign-in</button>;

  return (
    <>
      <nav className={`${styles.navbar}`}>
        <div className={`${styles.container}`}>
          <div className={`${styles.start}`}>
            <div
              className={
                `${styles.back} ${search_bar ? " block " : " hidden "} ` +
                " laptop:hidden "
              }
              onClick={() => searchBar_render()}
            >
              <BiArrowBack />
            </div>
            <div
              className={
                `${styles.menubar}  ${search_bar ? " hidden " : " block "}`  + " laptop:block "
                
              }
              onClick={() => dispatch(sideBarVisibilityUpdate())}
            >
              <GiHamburgerMenu />
            </div>
            <Link
              to="/"
              className={
                ` ${search_bar ? " hidden " : " block "}` + " laptop:block "
              }
            >
              <div className={`${styles.youtube_logo}`}>
                <div className={`${styles.icon}`}>
                  <BsYoutube />
                </div>
                <span className={`${styles.icon_text}`}>YouTube</span>
              </div>
            </Link>
            </div>
          <div className={`${styles.center}` + " tablet:justify-end"}>
            <div
              className={
                `${styles.input_container}  ${
                  search_bar ? " block " : " hidden"
                } ` + " laptop:hidden"
              }
            >
              <form className=""  onSubmit={searchHandler}>
                <div className="w-full flex justify-end items-center ">
                  <input type="text" className={`${styles.input}`}  value={searchTerm}
                    onChange={(e) => {
                      dispatch(changeSearchTerm(e.target.value));
                    }} />
                  <div className={`${styles.close}`}>
                    <AiOutlineClose
                      className={`text-xl cursor-pointer  ${
                        searchTerm ? " block " : " hidden "
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

            <form className="tablet:hidden" onSubmit={searchHandler}>
              <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
                <div className="flex gap-4 items-center pr-5">
                  <div>
                    <AiOutlineSearch className=" text-xl" />
                  </div>
                  <input
                    type="text"
                    style={{ width: "20vw" }}
                    className=" bg-zinc-900 focus:outline-none  border-none"
                    value={searchTerm}
                    onChange={(e) => {
                      dispatch(changeSearchTerm(e.target.value));
                    }}
                  />
                  <AiOutlineClose
                    className={`text-xl cursor-pointer  ${
                      searchTerm ? "visible " : "invisible"
                    }`}
                    onClick={() => dispatch(clearSearchTerm())}
                  />
                </div>
                <button className="h-10 w-16 flex items-center justify-center bg-zinc-800">
                  <AiOutlineSearch className="text-xl" />
                </button>
              </div>
            </form>

            <div
              className={
                ` ${search_bar ? " hidden" : " block "}` + " laptop:hidden"
              }
              onClick={() => searchBar_render()}
            >
              <AiOutlineSearch className="text-2xl cursor-pointer" />
            </div>
            <div className={"text-xl p-2 ml-3 bg-zinc-900 rounded-full tablet:hidden"}>
              <TiMicrophone />
            </div>
          </div>
          <div className={`${styles.end}`}>{accessToken ? nav_end_profile : sign_in}</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
