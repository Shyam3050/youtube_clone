import React from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import Spinner from "../Component/Spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Component/Card";
import VideoSkelton from "../Component/UI/VideoSkelton";
import { clearVideos } from "../store";

const Home = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.youtube_clone.videos);

  useEffect(() => {
    dispatch(clearVideos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />

        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid grid-cols-1  tablet:grid-cols-2 laptop:grid-cols-4 gap-y-14 gap-x-12  p-8">
              {videos.map((item) => {
                const ran_num = Math.random();
                return (
                  <Card data={item} key={item.videoId + ran_num.toString()} />
                );
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <div className="grid grid-cols-1  tablet:grid-cols-2 laptop:grid-cols-4 gap-y-14 gap-x-12  p-8 overflow-y-scroll">
            {[...Array(10)].map(() => {
              const adduniquenesstokey = Math.random() * Math.random();
              return <VideoSkelton key={adduniquenesstokey.toString()} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
