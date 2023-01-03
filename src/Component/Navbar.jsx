import React from "react";
import User from "./UI/user.png";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
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
      dispatch(setSearchBarVisibility())
      dispatch(clearSearchPageVideo());
      dispatch(getSearchPageVideos());
    }
  }

  return (
    <>
      <nav className="flex justify-between  tablet:pl-2 tablet:pr-2 pl-6 pr-14 h-14 items-center  bg-[#212121] opacity-95 sticky">
        <div className="flex gap-8 mobile:gap-2 items-center text-2xl">
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
        <div className=" tablet:hidden flex items-center justify-center gap-5">
          <form onSubmit={searchHandler}>
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
          <div className="text-xl p-3 bg-zinc-900 rounded-full">
            <TiMicrophone />
          </div>
        </div>
        <div className="flex gap-5 items-center text-xl">
          <div className="laptop:hidden" onClick={() => dispatch(setSearchBarVisibility())}>
            <AiOutlineSearch className="text-2xl cursor-pointer" />
          </div>
          <div className="tablet:hidden">
            <BsCameraVideo />
          </div>
          <div className="tablet:hidden">
            <IoAppsSharp />
          </div>
          <div className="relative">
            <BsBell />
            <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
              9+
            </span>
          </div>
          <img src={User} alt="user-logo" className="w-9 h-9 rounded-full " />
        </div>
      </nav>
      {searchBar && (
        <SerachBarMobile>
          <form onSubmit={searchHandler}>
            <div className="flex bg-zinc-900  h-10  pr-0 ">
              <div className="flex gap-4 items-center p-1 w-full bg-slate-800">
                <div>
                  <AiOutlineSearch className=" text-xl" />
                </div>
                <input
                  type="text"
                  style={{ width: "50vw" }}
                  className=" bg-zinc-500 focus:outline-none  border-none"
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
        </SerachBarMobile>
      )}
    </>
  );
};

export default Navbar;
