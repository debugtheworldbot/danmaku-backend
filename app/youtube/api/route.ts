import { google } from "googleapis";
import { NextResponse } from "next/server";
import { getListWithTime } from "../_lib/utils";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id)
      return NextResponse.json({ data: "id is required" }, { status: 400 });
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
    const supabase = createClient();
    const { data: dbList, error } = await supabase
      .from("danmakus")
      .select(
        `text,
        time`,
      )
      .eq("videoId", id);

    if (error) {
      return NextResponse.json({ data: error }, { status: 500 });
    }

    const res = getListWithTime(list.data);
    const result = [...res, ...dbList].sort((a, b) => a.time - b.time);
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
