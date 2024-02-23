import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || "gCNeDWCI0vo";
    const youtube = google.youtube({
      version: "v3",
      auth: process.env.GOOGLE_AUTH,
    });
    const detail = await youtube.videos.list({
      part: ["liveStreamingDetails", "snippet"],
      id: [id],
    });
    const items = detail.data.items;
    const channelId =
      (items && items[0].liveStreamingDetails?.activeLiveChatId) || "";
    return NextResponse.json({ channelId }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: "check error" }, { status: 500 });
  }
}
