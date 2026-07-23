"use client";

import { useState } from "react";
import { tutorialThumbnail } from "@/lib/tutorials";

// Lightweight YouTube embed: shows the thumbnail with a play button and only
// loads the real (heavy) iframe once the user clicks. Keeps the page fast and
// avoids YouTube's tracking/scripts until the visitor actually wants the video.
export default function YouTubeFacade({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
      {active ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tutorialThumbnail(id)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35"></span>
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
            <svg
              className="h-8 w-8 translate-x-0.5 text-purple-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
