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
            href="https://github.com/debugtheworldbot/danmaku/issues"
          >
            Add to Chrome
          </a>
        </header>
        <main className="h-full text-center text-5xl font-semibold mt-40">
          <h1>Read Send Show</h1>
          <h1 className="my-6">DanmuCat</h1>
          <h1>On YouTube videos</h1>
        </main>
      </div>
      <div className="h-full">
        <h1>Read Send Show</h1>
        <h1>DanmuCat</h1>
        <h1>On YouTube videos</h1>
      </div>
    </div>
  );
}
