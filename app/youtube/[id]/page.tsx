import { google } from "googleapis";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await getList(id);

  return (
    <div className="h-screen">
      {res?.map((comment, index) => (
        <div key={index}>
          {comment.time} ----
          {comment.text}
        </div>
      ))}
    </div>
  );
}

const getList = async (id = "86Gy035z_KA") => {
  try {
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.GOOGLE_AUTH,
    });
    const list = await youtube.commentThreads.list({
      part: ["snippet"],
      maxResults: 100,
      order: "relevance",
      videoId: id,
    });
    const withTimeFlag = list.data.items?.filter((item) =>
      item.snippet?.topLevelComment?.snippet?.textDisplay?.includes("href"),
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

    return res;
  } catch (e) {
    console.log(e);
    return [];
  }
};
