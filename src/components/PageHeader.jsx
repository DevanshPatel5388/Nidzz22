import { Flourish } from "./illustrations";

export default function PageHeader({ kicker, title, subtitle }) {
  return (
    <header className="mx-auto max-w-3xl px-5 pb-2 pt-10 text-center sm:pt-14">
      {kicker && <p className="font-hand text-2xl text-sun-deep sm:text-3xl">{kicker}</p>}
      <h1 className="text-balance mt-1 font-hand text-5xl leading-[0.92] text-ink sm:text-7xl">{title}</h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl font-serif text-xl italic leading-relaxed text-muted sm:text-2xl">
          {subtitle}
        </p>
      )}
      <Flourish />
    </header>
  );
}
