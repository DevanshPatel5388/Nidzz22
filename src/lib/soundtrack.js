import { birthdayTrackReady } from "virtual:birthday-track";

// Suno publishes this song at https://suno.com/s/wUI5P8MGR6isxzGr and also
// serves a hosted player page. That player cannot be started, paused, or
// muted by this website. Place the copy you download from Suno at
// public/audio/birthday-song.mp3 and this player will use it automatically.
export const birthdayTrackUrl = `${import.meta.env.BASE_URL}audio/birthday-song.mp3`;

let audio;

export function trackAvailable() {
  return birthdayTrackReady;
}

export function getTrack() {
  if (!birthdayTrackReady) return null;
  if (!audio) {
    audio = new Audio(birthdayTrackUrl);
    audio.preload = "auto";
    audio.loop = true;
    audio.setAttribute("playsinline", "true");
  }
  return audio;
}

export function playTrack() {
  const track = getTrack();
  if (!track) return Promise.resolve("missing");
  if (!track.paused && !track.ended) return Promise.resolve("playing");
  return track.play().then(() => "playing").catch(() => "blocked");
}

export function pauseTrack() {
  const track = getTrack();
  if (!track) return;
  track.pause();
}

export function setTrackMuted(muted) {
  const track = getTrack();
  if (!track) return;
  track.muted = muted;
}
