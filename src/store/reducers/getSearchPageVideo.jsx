import axios from "axios";
import { parseData } from "../../utils";
import { youtube_url } from "../../utils/youtubeUrl";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_KEY } from "../../utils/apiKey";

export const getSearchPageVideos = createAsyncThunk(
  "youtube-clone/getSearchPageVideos",
  async (isNext, { getState }) => {
    const {
      youtube_clone: {
        nextPageToken: nextPageTokenFromState,
        searchResults,
        searchTerm,
      },
    } = getState();

    console.log(nextPageTokenFromState, searchResults, searchTerm);
    const {
      data: { items, nextPageToken },
    } = await axios.get(
      `${youtube_url}/search?q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
        isNext ? `pageToken=${nextPageTokenFromState}` : ""
      }`
    );

    const parsedData = await parseData(items);
    console.log(parsedData);
    return {
      parsedData: [...searchResults, ...parsedData],
      nextPageToken,
    };
  }
);
