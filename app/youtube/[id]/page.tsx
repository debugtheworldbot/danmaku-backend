import { google } from "googleapis";
import { getListWithTime } from "../_lib/utils";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await getList(id);

  return (
    <div className="min-h-screen">
      <ol className="list-disc px-8 max-w-[70%]">
        {res?.map((comment, index) => (
          <li key={index}>
            <span className="text-blue-600 mr-4">{comment.time}</span>
            {comment.text}
          </li>
        ))}
      </ol>
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
    const res = getListWithTime(list.data);

    return res;
  } catch (e) {
    console.log(e);
    return [];
  }
};
