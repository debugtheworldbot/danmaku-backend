"use client";

export default function Page() {
  return (
    <div>
      <button
        onClick={async () => {
          const res = await fetch("/login/api", {
            method: "POST",
          });
          const data = await res.json();
          const url = data.data.url;
          console.log(url);
          window.location.href = url;
        }}
      >
        login
      </button>
    </div>
  );
}
