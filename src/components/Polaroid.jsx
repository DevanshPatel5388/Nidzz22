import { useState } from "react";
import { photoSrc } from "../lib/photos";
import { Sunflower } from "./illustrations";

export default function Polaroid({ photo, className = "" }) {
  const src = photoSrc(photo);
  const [failed, setFailed] = useState(!src);

  return (
    <figure
      className={`polaroid ${className}`}
      style={{ transform: `rotate(${photo.rotate}deg)` }}
    >
      <span className={`tape tape-${photo.tape === "sun" ? "sun" : "blush"}`} aria-hidden="true" />
      <div className="aspect-[4/5] overflow-hidden bg-[#f3eadf]">
        {!failed && src ? (
          <img
            src={src}
            alt={photo.caption}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1 bg-[linear-gradient(160deg,#f8f1e7,#f3d9d4)] px-4 text-center">
            <Sunflower className="h-16 w-auto" />
            <p className="font-type text-xs tracking-[0.22em] text-paper-ink">{photo.id}</p>
          </div>
        )}
      </div>
      <figcaption className="absolute inset-x-3 bottom-2 text-center font-hand text-[1.7rem] leading-none text-paper-ink">
        {photo.caption}
      </figcaption>
      {photo.sticker && (
        <span className="absolute -bottom-3 -right-3 grid h-12 w-12 rotate-12 place-items-center rounded-full bg-sun font-hand text-lg text-paper-ink shadow-md">
          {photo.sticker}
        </span>
      )}
    </figure>
  );
}
