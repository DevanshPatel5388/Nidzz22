import { useMemo } from "react";
import { Petal } from "./illustrations";

const colors = ["#f2c14e", "#e6b43a", "#f4c7c3", "#ffe7a3", "#f7d2c8"];

export default function FallingPetals({ count = 18 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 9,
        duration: 11 + Math.random() * 10,
        size: 12 + Math.random() * 16,
        drift: -40 + Math.random() * 80,
        color: colors[index % colors.length],
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <Petal
          key={petal.id}
          color={petal.color}
          className="petal"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 1.5,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            "--drift": `${petal.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
