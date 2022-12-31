import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VideoSkelton = () => {
  return (
    <div style={{ width: "100%", margin: "1rem 0" }} >
      <SkeletonTheme color="white" baseColor="#6A6969" highlightColor="#202020">
        <Skeleton height={150} width={220} />
        <div>
          <Skeleton
            style={{ margin: "0.5rem" }}
            circle
            height={40}
            width={40}
          />
          <Skeleton height={20} width="75%" />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default VideoSkelton;
