import React from "react";

export function ConfettiLayer({ fire, accentColor }: any) {
  const pieces = Array.from({ length: 32 }, (_, i) => i);
  return fire ? (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((i) => (
        <span
          key={i}
          className="absolute block h-3 w-2 animate-[fall_1600ms_linear_forwards]"
          style={{
            left: `${(i * 97) % 100}%`,
            top: "-10px",
            background: i % 2 ? accentColor : "#ffffff",
            transform: `rotate(${i * 17}deg)`,
            animationDelay: `${(i % 8) * 40}ms`,
          }}
        />
      ))}
      <style>{`@keyframes fall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(540deg);opacity:0}}`}</style>
    </div>
  ) : null;
}
