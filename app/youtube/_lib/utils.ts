import { youtube_v3 } from "googleapis";

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
    const timeR =
      item.snippet?.topLevelComment?.snippet?.textDisplay?.match(timeRegex);
    const time = timeR?.[1];
    const timeStamp = parseInt(time || "");

    const displayTime = formatTime(timeStamp);
    const originalText = item.snippet?.topLevelComment?.snippet?.textOriginal;
    const finalText = originalText?.replace(displayTime, ``);

    return {
      time: timeStamp,
      text: finalText?.trim(),
    };
  });

  return res || [];
};
