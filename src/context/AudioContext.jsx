import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { createPiano } from "../lib/piano";
import { trackAvailable } from "../lib/soundtrack";

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const location = useLocation();
  const engine = useRef(null);
  if (!engine.current) engine.current = createPiano();

  const [enabled, setEnabled] = useState(() => localStorage.getItem("birthday-piano") === "on");
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const piano = engine.current;
    return () => piano.dispose();
  }, []);

  useEffect(() => {
    localStorage.setItem("birthday-piano", enabled ? "on" : "off");
  }, [enabled]);

  useEffect(() => {
    let cancel = false;
    const piano = engine.current;

    async function sync() {
      if (trackAvailable()) {
        piano.stop();
        if (!cancel) setBlocked(false);
      } else if (enabled && location.pathname === "/surprise") {
        const ok = await piano.start();
        if (!cancel) setBlocked(!ok);
      } else {
        piano.stop();
        if (!cancel) setBlocked(false);
      }
    }

    sync();
    return () => {
      cancel = true;
    };
  }, [enabled, location.pathname]);

  const value = useMemo(
    () => ({
      enabled,
      blocked,
      toggle: async () => {
        if (enabled) {
          setEnabled(false);
          setBlocked(false);
          engine.current.stop();
          return;
        }
        setEnabled(true);
        if (!trackAvailable() && location.pathname === "/surprise") {
          const ok = await engine.current.start();
          setBlocked(!ok);
        }
      },
    }),
    [enabled, blocked, location.pathname],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within AudioProvider");
  return context;
}
