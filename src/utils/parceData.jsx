import axios from "axios";
import {
  convertRawViewstoString,
  parseVideoDuration,
  timeSince,
} from "./index";
import { youtube_url } from "./youtubeUrl";
import { API_KEY } from "./apiKey";

export const parseData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];
    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    const {
      data: { items: channelsData },
    } = await axios.get(
      `${youtube_url}/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parsedChannelsData = [];
    channelsData.forEach((channel) =>
      parsedChannelsData.push({
        id: channel.id,
        image: channel.snippet.thumbnails.default.url,
      })
    );

    const {
      data: { items: videosData },
    } = await axios.get(
      `${youtube_url}/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );
    const parsedData = [];
    items.forEach((item, index) => {
      const { image: channelImage } = parsedChannelsData.find(
        (data) => data.id === item.snippet.channelId
      );
      if (channelImage)
        parsedData.push({
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(
            videosData[index].contentDetails.duration
          ),
          videoViews: convertRawViewstoString(
            videosData[index].statistics.viewCount
          ),
          videoAge: timeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage,
            name: item.snippet.channelTitle,
          },
        });
    });

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
