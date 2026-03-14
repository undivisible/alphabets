import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiLayer({ fire, accentColor }: { fire: boolean; accentColor: string }) {
  useEffect(() => {
    if (!fire) return;
    confetti({
      particleCount: 140,
      spread: 110,
      origin: { y: 0.08 },
      colors: [accentColor, "#ffffff", accentColor],
      disableForReducedMotion: true,
    });
  }, [fire]);

  return null;
}
