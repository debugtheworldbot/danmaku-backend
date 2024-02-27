"use client";
import { useState } from "react";

export default function Add() {
  const [text, setText] = useState("");
  const [videoId, setVideoId] = useState("");
  const [time, setTime] = useState(0);
  return (
    <div>
      <div>
        videoId:
        <input value={videoId} onChange={(e) => setVideoId(e.target.value)} />
      </div>
      <div>
        text:
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        time:
        <input
          value={time}
          type="number"
          onChange={(e) => setTime(parseInt(e.target.value))}
        />
      </div>
      <button
        onClick={async () => {
          await fetch("/youtube/list/api", {
            method: "POST",
            body: JSON.stringify({
              text,
              videoId,
              time,
            }),
          });
        }}
      >
        Add
      </button>
    </div>
  );
}
