import { Danmu, Play, Read, Send } from "./_components/Icons";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="h-full bg-[#FCFAF0] overflow-auto">
      <div className="h-full">
        <header className="flex justify-between items-center py-3 px-12 w-screen">
          <div className="flex-1 flex items-center gap-4">
            <span className="text-2xl font-bold">DanmuCat</span>
            <span className="md:block hidden">
              A Chrome extension to display danmaku in youTube
            </span>
          </div>
          <a
            className="rounded-full bg-black py-1 px-4 text-white font-medium text-base"
            rel="noreferrer"
            target="_blank"
            href="https://chromewebstore.google.com/detail/danmucat-show-youtube-vid/agojppemajejogigonpnmjicgpmapmjd"
          >
            Add to Chrome
          </a>
        </header>
        <main className="text-center text-[4rem] font-medium md:mt-30 mt-12">
          <Title />
        </main>
        <div className="relative h-full mt-12">
          <Image
            src="/desc.png"
            alt="intros"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
}

const Title = () => (
  <div>
    <h1 className="flex items-center justify-center gap-2 flex-wrap">
      Read <Read /> Send <Send /> Show
    </h1>
    <h1 className="my-6">
      DanmuCat <Danmu />
    </h1>
    <h1>
      <Play /> On YouTube videos
    </h1>
  </div>
);
