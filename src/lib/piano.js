/** Original slow melody. Synthesized in the browser so the gift stays free of recorded tracks. */
const melody = [
  { f: 349.23, gap: 0.78 },
  { f: 440.0, gap: 0.78 },
  { f: 523.25, gap: 1.15 },
  { f: 440.0, gap: 0.55 },
  { f: 392.0, gap: 0.78 },
  { f: 349.23, gap: 1.35 },
  { f: 523.25, gap: 0.72 },
  { f: 587.33, gap: 0.72 },
  { f: 523.25, gap: 0.72 },
  { f: 440.0, gap: 1.25 },
  { f: 466.16, gap: 0.72 },
  { f: 440.0, gap: 0.72 },
  { f: 392.0, gap: 0.78 },
  { f: 349.23, gap: 1.55 },
  { f: 440.0, gap: 0.72 },
  { f: 523.25, gap: 0.72 },
  { f: 698.46, gap: 1.2 },
  { f: 659.25, gap: 0.58 },
  { f: 587.33, gap: 0.72 },
  { f: 523.25, gap: 0.72 },
  { f: 440.0, gap: 1.35 },
  { f: 392.0, gap: 0.72 },
  { f: 440.0, gap: 0.72 },
  { f: 466.16, gap: 0.72 },
  { f: 587.33, gap: 1.15 },
  { f: 523.25, gap: 0.78 },
  { f: 440.0, gap: 0.78 },
  { f: 349.23, gap: 1.85 },
];

export function createPiano() {
  let ctx = null;
  let master = null;
  let timer = null;
  let playing = false;
  let index = 0;
  let nextTime = 0;
  let session = 0;
  let onVis = null;

  function ensure() {
    if (ctx) return ctx;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = 0.0001;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1500;
    filter.Q.value = 0.35;
    master.connect(filter);
    filter.connect(ctx.destination);
    onVis = () => {
      if (!ctx || !master || !playing) return;
      const target = document.hidden ? 0.0001 : 0.85;
      master.gain.setTargetAtTime(target, ctx.currentTime, 0.25);
    };
    document.addEventListener("visibilitychange", onVis);
    return ctx;
  }

  function playTone(freq, time, dur, peak, type) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(peak, time + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(gain);
    gain.connect(master);
    osc.start(time);
    osc.stop(time + dur + 0.06);
  }

  function tick() {
    if (!playing || !ctx) return;
    const horizon = ctx.currentTime + 0.4;
    while (nextTime < horizon) {
      const note = melody[index % melody.length];
      const dur = Math.min(note.gap * 0.92, 1.45);
      playTone(note.f, nextTime, dur, 0.04, "triangle");
      playTone(note.f, nextTime, dur, 0.018, "sine");
      if (index % 4 === 0) playTone(note.f / 2, nextTime, 1.6, 0.016, "sine");
      nextTime += note.gap;
      index += 1;
    }
    timer = window.setTimeout(tick, 90);
  }

  return {
    async start() {
      if (playing && ctx?.state === "running") return true;
      const my = ++session;
      try {
        ensure();
        if (ctx.state === "suspended") await ctx.resume();
        if (my !== session) return false;
        if (ctx.state !== "running") return false;
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), ctx.currentTime);
        master.gain.exponentialRampToValueAtTime(0.85, ctx.currentTime + 1.3);
        index = 0;
        nextTime = ctx.currentTime + 0.12;
        playing = true;
        tick();
        return true;
      } catch {
        return false;
      }
    },
    stop() {
      session += 1;
      playing = false;
      if (timer) window.clearTimeout(timer);
      timer = null;
      if (ctx && master) {
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        const current = Math.max(master.gain.value, 0.0001);
        master.gain.setValueAtTime(current, now);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      }
    },
    dispose() {
      this.stop();
      if (onVis) document.removeEventListener("visibilitychange", onVis);
      if (ctx) ctx.close().catch(() => {});
      ctx = null;
    },
  };
}
