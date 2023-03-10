import React, { useEffect } from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Component/Spinner";
import { useSelector, useDispatch } from "react-redux";
import SearchCard from "../Component/SearchCard";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideo";
import { clearSearchPageVideo } from "../store";
import { useNavigate } from "react-router-dom";
import MiniGuideBar from "../Component/MiniGuideBar";

const Search = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const searchVideos = useSelector(
    (state) => state.youtube_clone.searchResults
  );
  const sideBarVisibility = useSelector((state) => state.UI.sideBarVisibility);
  const searchTerm = useSelector((state) => state.youtube_clone.searchTerm);
  console.log(searchVideos);
  useEffect(() => {
    dispatch(clearSearchPageVideo());
    if (searchTerm === "") navigate("/");
    else {
      dispatch(getSearchPageVideos(false));
      console.log(searchVideos);
    }
  }, []);

  return (
    <div className="max-h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <div  className= "search_mini_sidebar" >
          <MiniGuideBar  />
          {sideBarVisibility && <Sidebar />}
        </div>
        {searchVideos.length ? (
          <div className=" py-8 tablet:pl-2 pl-8 flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={searchVideos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={searchVideos.length < 500}
              loader={<Spinner />}
              height={600}
            >
              {searchVideos.map((item) => {
                const ran_num = Math.random();
                return (
                  <div className="my-5" key={item.videoId + ran_num.toString()}>
                    <SearchCard data={item} />
                  </div>
                );
              })}
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
