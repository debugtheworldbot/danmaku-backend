import { google } from "googleapis";
import { NextResponse } from "next/server";

export type YT_Response = {
  time: number;
  text: string;
}[];
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "86Gy035z_KA";
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

  return NextResponse.json({ data: res }, { status: 200 });
}
