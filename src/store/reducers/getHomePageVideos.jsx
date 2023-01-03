import axios from "axios";
import { parseData } from "../../utils";
import { youtube_url } from "../../utils/youtubeUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY } from "../../utils/apiKey";


export const getHomePageVideos = createAsyncThunk(
  "youtube-clone/getHomePageVideos",
  async (isNext, {getState} ) => {
     const {
      youtube_clone: { nextPageToken: nextPageTokenFromState, videos },
    } = getState();
  

    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${youtube_url}/search?maxResults=20&q="javascript"&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );

    const parsedData = await parseData(items);

    return {
      parsedData: [...videos, ...parsedData],
      nextPageToken,
    };
  }
);

// export const getHomePageVideos = (isNext) => {
//   return async (dispatch, getState) => {
//     const {
//       youtube_clone: { nextPageToken: nextPageTokenFromState, videos },
//     } = getState();

//     const {
//       data: { items, nextPageToken },
//     } = await axios.get(
//       `${youtube_url}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
//         isNext ? `pageToken=${nextPageTokenFromState}` : ""
//       }`
//     );
//     console.log(items, nextPageToken);

//     const parsedData = await parseData(items);
//     dispatch(
//       youtubeActions.addHomePageVideos({
//         parsedData: [...videos, ...parsedData],
//         nextPageToken,
//       })
//     );
//     return;
//   };
// };
