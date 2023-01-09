import { createSlice, configureStore } from "@reduxjs/toolkit";
import { getHomePageVideos } from "./reducers/getHomePageVideos";
import { getSearchPageVideos } from "./reducers/getSearchPageVideo";
import { getVideoDetails } from "./reducers/getVideoDetails";
import { getRecommendedVideos } from "./reducers/getRecomended";
import { authentication } from "./reducers/authentication";

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

const initialAuthState = {
  accessToken: sessionStorage.getItem("youtube_token") ? sessionStorage.getItem("youtube_token") : "",
  user: sessionStorage.getItem("youtube_profile") ? JSON.parse(sessionStorage.getItem("youtube_profile")) : {},
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state)=>{
       state.accessToken = "";
       state.user = {};
       sessionStorage.removeItem("youtube_token")
       sessionStorage.removeItem("youtube_profile")
    } 
  },
  extraReducers: builder =>{
  builder.addCase(authentication.fulfilled, (state, action) => {
    state.accessToken = action.payload.accessToken;
    state.user = action.payload.user;
    sessionStorage.setItem("youtube_token", action.payload.accessToken);
    sessionStorage.setItem("youtube_profile", JSON.stringify(action.payload.user))
  })
  }
  
})

const uiSlice = createSlice({
  name: "UI",
  initialState: initialUIState,
  reducers: {
    sideBarVisibilityUpdate: state =>{
      state.sideBarVisibility = !state.sideBarVisibility;
    },
    
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
    UI: uiSlice.reducer,
    auth: authSlice.reducer
  },
});

export const {
  clearVideos,
  changeSearchTerm,
  clearSearchTerm,
  clearSearchPageVideo,
} = youtubeSlice.actions;
export const {sideBarVisibilityUpdate} = uiSlice.actions;
export const {logout} = authSlice.actions;