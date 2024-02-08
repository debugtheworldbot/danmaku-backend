import { google } from "googleapis";
import { NextResponse } from "next/server";

export type YT_Response = {
  timeStamp: number;
  content: string;
}[];
export async function GET() {
  const youtube = google.youtube({
    version: "v3",
    auth: "AIzaSyDOqNVSorlAfcAjUueXdEYtskFeJXQGFBk",
  });
  const list = await youtube.commentThreads.list({
    part: ["snippet"],
    maxResults: 100,
    order: "relevance",
    videoId: "86Gy035z_KA",
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
      timeStamp,
      content: item.snippet?.topLevelComment?.snippet?.textOriginal,
    };
  });
  console.log("ssss", res);

  return NextResponse.json({ data: res }, { status: 200 });
}
