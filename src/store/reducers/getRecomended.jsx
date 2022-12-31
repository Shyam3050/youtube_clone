import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { youtube_url } from "../../utils/youtubeUrl";
import { API_KEY } from "../../utils/apiKey";
import { parseRecommendedData } from "../../utils/parceRecommendedData";

export const getRecommendedVideos = createAsyncThunk(
  "yotubeApp/getRecommendedVideos",
  async (videoId, { getState} ) => {
  
    const {
      youtube_clone: {
        currentPlaying: {
          channelInfo: { id: channelId },
        },
      },
    } = getState();

     
    const {
      data: { items },
    } = await axios.get(
      `${youtube_url}/activities?key=${API_KEY}&channelId=${channelId}&part=snippet,contentDetails&maxResults=20&type=video&videoId=${videoId}`
    );
console.log("sss");
console.log(items)
    const parsedData = await parseRecommendedData(items, videoId);

     console.log(parsedData)
    return { parsedData };
  }
);
