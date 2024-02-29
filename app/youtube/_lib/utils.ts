import { youtube_v3 } from "googleapis";

export const getListWithTime = (
  list: youtube_v3.Schema$CommentThreadListResponse,
) => {
  const withTimeFlag = list.items?.filter(
    (item) =>
      item.snippet?.topLevelComment?.snippet?.textDisplay?.includes(
        'href="https://www.youtube.com/watch',
      ) &&
      (item.snippet.topLevelComment.snippet.textOriginal || "").length < 300,
  );

  const timeRegex = /;t=(\d+)/;

  const res = withTimeFlag?.map((item) => {
    const time =
      item.snippet?.topLevelComment?.snippet?.textDisplay?.match(timeRegex);
    const timeStamp = parseInt(time?.[1] || "0");

    return {
      time: timeStamp,
      text: item.snippet?.topLevelComment?.snippet?.textOriginal,
    };
  });

  return res || [];
};
