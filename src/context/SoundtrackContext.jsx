import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTrack, pauseTrack, playTrack, setTrackMuted, trackAvailable } from "../lib/soundtrack";

const SoundtrackContext = createContext(null);

export function SoundtrackProvider({ children }) {
  const location = useLocation();
  const available = trackAvailable();
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const track = getTrack();
    if (!track) return undefined;

    const sync = () => {
      const isPlaying = !track.paused && !track.ended;
      setPlaying(isPlaying);
      setMuted(track.muted);
      if (isPlaying) setStarted(true);
    };

    track.addEventListener("play", sync);
    track.addEventListener("pause", sync);
    track.addEventListener("ended", sync);
    track.addEventListener("volumechange", sync);
    sync();

    return () => {
      track.removeEventListener("play", sync);
      track.removeEventListener("pause", sync);
      track.removeEventListener("ended", sync);
      track.removeEventListener("volumechange", sync);
    };
  }, [available]);

  const begin = useCallback(() => {
    setOpened(true);
    if (!available) return;
    playTrack();
  }, [available]);

  const toggle = useCallback(() => {
    const track = getTrack();
    if (!track) return;
    if (!track.paused && !track.ended) {
      pauseTrack();
      return;
    }
    playTrack();
  }, []);

  const toggleMute = useCallback(() => {
    const track = getTrack();
    if (!track) return;
    setTrackMuted(!track.muted);
  }, []);

  const visible = available && (opened || location.pathname !== "/");
  const needsGesture = visible && !playing && !started;

  const value = useMemo(
    () => ({ available, visible, playing, muted, needsGesture, begin, toggle, toggleMute }),
    [available, visible, playing, muted, needsGesture, begin, toggle, toggleMute],
  );

  return <SoundtrackContext.Provider value={value}>{children}</SoundtrackContext.Provider>;
}

export function useSoundtrack() {
  const context = useContext(SoundtrackContext);
  if (!context) throw new Error("useSoundtrack must be used within SoundtrackProvider");
  return context;
}
