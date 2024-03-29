import React from "react";
import Navbar from "../Component/Navbar";
import Sidebar from "../Component/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Component/Card";
import VideoSkelton from "../Component/UI/VideoSkelton";
import { clearVideos } from "../store";
import MiniGuideBar from "../Component/MiniGuideBar";
import Spinner from "../Component/Spinner";

const Home = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.youtube_clone.videos);
  const sideBarVisibility = useSelector((state) => state.UI.sideBarVisibility);

  useEffect(() => {
    dispatch(clearVideos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="overflow-scroll" >
      <div>
        <Navbar />
      </div>
      {
        <div className="" style={{ height: "92.5vh" }}>
          <div style={{ width: "72px" }}>
            <MiniGuideBar />
            {sideBarVisibility && <Sidebar />}
          </div>

          {videos.length ? (
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={true}
              loader={<Spinner />}
            >
              <div className="grid_main_container  ">
                <div className=" grid_container ">
                  {videos.map((item) => {
                    const ran_num = Math.random() * Math.random();
                    return (
                      <Card
                        data={item}
                        key={item.videoId + ran_num.toString()}
                      />
                    );
                  })}
                </div>
              </div>
            </InfiniteScroll>
          ) : (
            <div className="grid_main_container skelton ">
              <div className="grid_container ">
                {[...Array(10)].map(() => {
                  const adduniquenesstokey = Math.random() * Math.random();
                  return <VideoSkelton key={adduniquenesstokey.toString()} />;
                })}
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default Home;
