import React from "react";
import  User from "./UI/user.png"
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
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideo";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = useSelector((state) => state.youtube_clone.searchTerm);

  function searchHandler(e) {
    e.preventDefault();
    if (location.pathname !== "/search") {
      navigate("/search");
    }else{
      dispatch(clearSearchPageVideo());
      dispatch(getSearchPageVideos());
    }
  }

  return (
    <nav className="flex justify-between pl-7 pr-14 h-14 items-center  bg-[#212121] opacity-95 sticky">
      <div className="flex gap-8 items-center text-2xl">
        <div>
          <GiHamburgerMenu />
        </div>
        <Link to="/">
          <div className="flex items-center justify-center">
            <BsYoutube className=" text-3xl text-red-600 " />
            <span className="text-xl font-medium">YouTube</span>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form onSubmit={searchHandler}>
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl" />
              </div>
              <input
                type="text"
                className="w-96  bg-zinc-900 focus:outline-none  border-none"
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
        <BsCameraVideo />
        <IoAppsSharp />
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            9+
          </span>
        </div>
        <img
          src= {User}
          alt="user-logo"
          className="w-9 h-9 rounded-full "
        />
      </div>
    </nav>
  );
};

export default Navbar;
