import { createClient } from "@/utils/supabase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data } = await supabase.from("danmakus").select();
  const { data: notes } = await supabase.from("notes").select();
  console.log(data, notes);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  );
}
