import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    console.log(data);

    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: "error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") || "86Gy035z_KA";
  try {
    const { data, error } = await supabase
      .from("danmakus")
      .select("*")
      .eq("videoId", id);

    if (error) {
      return NextResponse.json({ data: error }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ data: "error" }, { status: 500 });
  }
}
