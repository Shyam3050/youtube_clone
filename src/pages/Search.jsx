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

const Search = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const searchVideos = useSelector(
    (state) => state.youtube_clone.searchResults
  );
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
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex pt-3" style={{ height: "92.5vh" }}>
        <Sidebar />
        {searchVideos.length ? (
          <div className="py-8 pl-8 flex flex-col gap-5 w-full">
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
                    <SearchCard data={item} />;
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
