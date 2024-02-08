import { google } from "googleapis";

export default async function Page() {
  const youtube = google.youtube({
    version: "v3",
    auth: "AIzaSyDOqNVSorlAfcAjUueXdEYtskFeJXQGFBk",
  });
  const result = await youtube.commentThreads.list({
    part: ["snippet"],
    maxResults: 100,
    order: "relevance",
    videoId: "86Gy035z_KA",
  });

  console.log(result);
  const withTimeFlag = result.data.items?.filter((item) =>
    item.snippet?.topLevelComment?.snippet?.textDisplay?.includes("href"),
  );
  return (
    <div className="h-screen">
      {withTimeFlag?.map((comment) => (
        <div key={comment.id}>
          {comment.snippet?.topLevelComment?.snippet?.textOriginal}
        </div>
      ))}
    </div>
  );
}
