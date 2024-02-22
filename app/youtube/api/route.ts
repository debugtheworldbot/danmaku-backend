import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getListWithTime } from "../_lib/utils";

export async function GET(request: Request) {
  try {
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
    const res = getListWithTime(list.data);
    return NextResponse.json({ data: res }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
