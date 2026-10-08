import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import { SleepingCat } from "../components/illustrations";
import { letter, site } from "../data/content";

export default function Letter() {
  const reduce = useReducedMotion();
  const pageRef = useRef(null);
  const inView = useInView(pageRef, { once: true, amount: 0.35 });
  const [count, setCount] = useState(reduce ? letter.length : 0);
  const done = count >= letter.length;

  useEffect(() => {
    if (reduce) {
      setCount(letter.length);
      return undefined;
    }
    if (!inView || done) return undefined;
    const timer = setTimeout(() => setCount((current) => current + 1), 16);
    return () => clearTimeout(timer);
  }, [count, done, inView, reduce]);

  useEffect(() => {
    if (!inView || done || reduce) return undefined;
    if (count % 6 !== 0) return undefined;
    const node = pageRef.current;
    if (!node) return undefined;
    const rect = node.getBoundingClientRect();
    const caretTop = rect.top + (count / letter.length) * rect.height;
    if (caretTop > window.innerHeight * 0.78) {
      window.scrollBy({ top: 28, behavior: "smooth" });
    }
    return undefined;
  }, [count, done, inView, reduce]);

  return (
    <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
      <PageHeader
        kicker="read slowly"
        title="Birthday Letter"
        subtitle={`for ${site.name}, on ${site.birthdayLabel}`}
      />

      <article ref={pageRef} className="notebook relative mx-auto mt-6 max-w-2xl -rotate-1 rounded-sm">
        <span className="hole top-8" />
        <span className="hole top-24" />
        <span className="hole top-40" />
        <div
          className="notebook-body w-full cursor-text text-left"
          onClick={() => setCount(letter.length)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") setCount(letter.length);
          }}
          role="button"
          tabIndex={0}
          aria-label="Birthday letter. Activate to show the full letter."
        >
          {letter.slice(0, count)}
          {!done && <span className="caret" aria-hidden="true" />}
        </div>
      </article>

      {!done && (
        <p className="mt-4 text-center font-hand text-2xl text-muted">tap the page to read it all at once</p>
      )}

      <SleepingCat className="mx-auto mt-2 h-24 w-auto" />
    </div>
  );
}
