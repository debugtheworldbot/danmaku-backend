import { google } from "googleapis";
import { getListWithTime } from "../_lib/utils";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await getList(id);

  const data = await getLiveList();

  return (
    <div className="min-h-screen flex">
      <div>
        <h1>live chat</h1>
        {data?.pollingIntervalMillis} |||
        {data?.nextPageToken}
        <ol className="list-disc px-8">
          {data?.items?.map((comment, index) => (
            <li key={index}>
              <span className="text-blue-600 mr-4">
                {comment.author?.displayName}
              </span>
              {comment.text}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h1>comments</h1>
        <ol className="list-disc px-8">
          {res?.map((comment, index) => (
            <li key={index}>
              <span className="text-blue-600 mr-4">{comment.time}</span>
              {comment.text}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const getLiveList = async (
  id = "gCNeDWCI0vo",
  pageToken = "GKTejdP7voQDIPDc59b7voQD",
) => {
  const youtube = google.youtube({
    version: "v3",
    auth: process.env.GOOGLE_AUTH,
  });
  const detail = await youtube.videos.list({
    part: ["liveStreamingDetails", "snippet"],
    id: [id],
  });
  const items = detail.data.items;
  if (!items) return;
  const channelId = items[0].liveStreamingDetails?.activeLiveChatId;
  if (!channelId) return;

  const list = await youtube.liveChatMessages.list({
    part: ["snippet", "authorDetails"],
    liveChatId: channelId,
    pageToken,
  });
  const data = list.data;
  const res = data.items?.map((item) => {
    const text = item.snippet?.displayMessage;
    return {
      text,
      author: item.authorDetails,
    };
  });
  return {
    pollingIntervalMillis: data.pollingIntervalMillis,
    nextPageToken: data.nextPageToken,
    items: res || [],
  };
};

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
