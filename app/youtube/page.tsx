import { YT_Response } from "./api/route";

export default async function Page() {
  const res = await fetch(process.env.URL + "/youtube/api", {
    method: "GET",
    headers: {
      contentType: "application/json",
    },
  }).then((res) => res.json());
  const data = res.data as YT_Response;

  return (
    <div className="h-screen">
      {data.map((comment, index) => (
        <div key={index}>
          {comment.timeStamp} ----
          {comment.content}
        </div>
      ))}
    </div>
  );
}
