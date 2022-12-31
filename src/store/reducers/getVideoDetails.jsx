import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawViewstoString, timeSince } from "../../utils";

import { youtube_url } from "../../utils/youtubeUrl";
import { API_KEY } from "../../utils/apiKey";

export const getVideoDetails = createAsyncThunk(
  "yotubeApp/videoDetails",
  async (id) => {
    const {
      data: { items },
    } = await axios.get(
      `${youtube_url}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`
    );
    return parseData(items[0]);
  }
);

const parseData = async (item) => {
  const {
    data: {
      items: [
        {
          snippet: {
            thumbnails: {
              default: { url: channelImage },
            },
          },
          statistics: { subscriberCount },
        },
      ],
    },
  } = await axios.get(
    `${youtube_url}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`
  );

  return {
    videoId: item.id,
    videoTitle: item.snippet.title,
    videoDescription: item.snippet.description,
    videoViews: parseInt(item.statistics.viewCount).toLocaleString(),
    videoLikes: convertRawViewstoString(item.statistics.likeCount),
    videoAge: timeSince(new Date(item.snippet.publishedAt)),
    channelInfo: {
      id: item.snippet.channelId,
      image: channelImage,
      name: item.snippet.channelTitle,
      subscribers: convertRawViewstoString(subscriberCount, true),
    },
  };
};
