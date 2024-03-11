import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ data: "no quota left" }, { status: 500 });
  // try {
  //   const { searchParams } = new URL(request.url);
  //   const channelId = searchParams.get("channelId");
  //   const pageToken = searchParams.get("pageToken") || undefined;
  //   if (!channelId) {
  //     return NextResponse.json(
  //       { data: "channelId is required" },
  //       { status: 500 },
  //     );
  //   }
  //   const youtube = google.youtube({
  //     version: "v3",
  //     auth: process.env.GOOGLE_AUTH,
  //   });
  //   const list = await youtube.liveChatMessages.list({
  //     part: ["snippet", "authorDetails"],
  //     liveChatId: channelId,
  //     pageToken,
  //   });
  //   const data = list.data;
  //   const res = data.items?.map((item) => {
  //     const text = item.snippet?.displayMessage;
  //     return {
  //       text,
  //       author: item.authorDetails,
  //     };
  //   });
  //   const result = {
  //     pollingIntervalMillis: data.pollingIntervalMillis,
  //     nextPageToken: data.nextPageToken,
  //     items: res || [],
  //     channelId,
  //   };
  //   return NextResponse.json({ data: result }, { status: 200 });
  // } catch (e) {
  //   return NextResponse.json({ data: "live chat list error" }, { status: 500 });
  // }
}
