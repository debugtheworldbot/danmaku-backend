import { youtube_v3 } from "googleapis";
import { parseEmoji } from "./parseEmoji";

export const formatTime = (s?: number) => {
  if (!s) return "";
  const minutes = Math.floor(s / 60);
  const seconds = Math.floor(s % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const getListWithTime = (
  list: youtube_v3.Schema$CommentThreadListResponse,
  id: string,
) => {
  const withTimeFlag = list.items?.filter((item) => {
    return (
      item.snippet?.topLevelComment?.snippet?.textDisplay?.includes(
        `href="https://www.youtube.com/watch?v=${id}`,
      ) &&
      (item.snippet.topLevelComment.snippet.textOriginal || "").length < 300
    );
  });

  const timeRegex = /;t=(\d+)/;

  const res = withTimeFlag?.map((item) => {
    const displayText = item.snippet?.topLevelComment?.snippet?.textDisplay;
    const timeR = displayText?.match(timeRegex);
    const time = timeR?.[1];
    const timeStamp = parseInt(time || "");

    const originalText = item.snippet?.topLevelComment?.snippet?.textDisplay;
    const output = parseEmoji(originalText || "");

    return {
      time: timeStamp,
      text: output,
      displayText: item.snippet?.topLevelComment?.snippet?.textOriginal,
    };
  });

  return res || [];
};
