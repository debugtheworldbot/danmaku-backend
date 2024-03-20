"use client";
import { Player } from "@lottiefiles/react-lottie-player";
import anim from "./side_anim.json";
import React from "react";

export default function Side() {
  return (
    <aside className="self-center relative">
      <a
        className="rounded-full bg-primary py-1 px-4 text-white font-medium text-base mx-auto w-fit block"
        rel="noreferrer"
        target="_blank"
        href="https://chromewebstore.google.com/detail/danmucat-display-youtube/agojppemajejogigonpnmjicgpmapmjd"
      >
        Chrome Extension
      </a>
      {/* <Bg /> */}
      {/**/}
      {/* <div className="absolute top-[20%]"> */}
      {/*   <Player speed={1.25} autoplay loop src={anim} className="h-120" /> */}
      {/* </div> */}
    </aside>
  );
}
const Bg = () => (
  <svg
    width="340"
    height="620"
    viewBox="0 0 360 640"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="40"
      y="40"
      width="200"
      height="40"
      rx="8"
      fill="#FF6666"
      fillOpacity="0.08"
    />
    <rect
      width="200"
      height="40"
      rx="8"
      transform="matrix(-1 0 0 1 360 480)"
      fill="#FF6666"
      fillOpacity="0.08"
    />
    <rect
      x="120"
      y="120"
      width="200"
      height="40"
      rx="8"
      fill="#FF6666"
      fillOpacity="0.08"
    />
    <rect
      width="200"
      height="40"
      rx="8"
      transform="matrix(-1 0 0 1 240 560)"
      fill="#FF6666"
      fillOpacity="0.08"
    />
    <rect
      y="240"
      width="200"
      height="40"
      rx="8"
      fill="#FF6666"
      fillOpacity="0.08"
    />
    <rect
      x="160"
      y="320"
      width="200"
      height="40"
      rx="8"
      fill="#FF6666"
      fillOpacity="0.08"
    />
  </svg>
);
