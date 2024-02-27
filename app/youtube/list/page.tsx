import { createClient } from "@/utils/supabase/server";
import Add from "./components/Add";

export default async function Notes() {
  const supabase = createClient();
  const { data } = await supabase.from("danmakus").select("*");
  // .eq("videoId", "videoId2");

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Add />
    </div>
  );
}
