import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getHomePageVideos } from "./reducers/getHomePageVideos";
import { getSearchPageVideos } from "./reducers/getSearchPageVideo";
import { getVideoDetails } from "./reducers/getVideoDetails";
import { getRecommendedVideos } from "./reducers/getRecomended";

const initialYoutubeState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  searchResults: [],
  nextPageToken: null,
  recommendedVideos: [],
};

const initialUIState = {
  sideBarVisibility: false,
  searchBar: false
}

const uiSlice = createSlice({
  name: "UI",
  initialState: initialUIState,
  reducers: {
    sideBarVisibilityUpdate: state =>{
      state.sideBarVisibility = !state.sideBarVisibility;
    },
    setSearchBarVisibility : state => {
      state.searchBar = !state.searchBar;
    }
  }
})

const youtubeSlice = createSlice({
  name: "youtube-clone",
  initialState:initialYoutubeState,
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },

    clearSearchPageVideo: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      state.videos = action.payload.parsedData;
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      state.searchResults = action.payload.parsedData;
      console.log(action.payload);
      state.nextPageToken = action.payload.nextPageToken;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
    });
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      console.log(action.payload.parsedData)
      state.recommendedVideos = action.payload.parsedData;
    });
  },
});

export const store = configureStore({
  reducer: {
    youtube_clone: youtubeSlice.reducer,
    UI: uiSlice.reducer
  },
});

export const {
  clearVideos,
  changeSearchTerm,
  clearSearchTerm,
  clearSearchPageVideo,
} = youtubeSlice.actions;
export const {sideBarVisibilityUpdate,setSearchBarVisibility} = uiSlice.actions;
