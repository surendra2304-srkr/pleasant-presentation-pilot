import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BotOrbProps = {
  size?: number;
  className?: string;
  /** blink + idle breathing */
  idle?: boolean;
  /** the orb leans and the eyes follow the pointer */
  track?: boolean;
  /** how far the pupils can travel, in viewBox units */
  reach?: number;
};

/**
 * The KaliGan pebble — a soft, glossy black blob with two white eyes.
 * Organic (not a perfect circle), squishes on hover, blinks, breathes,
 * and leans toward the pointer with the eyes tracking it.
 */
export function BotOrb({
  size = 96,
  className,
  idle = true,
  track = true,
  reach = 9,
}: BotOrbProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [blink, setBlink] = useState(false);
  const [hover, setHover] = useState(false);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [lean, setLean] = useState({ x: 0, y: 0, rot: 0 });

  useEffect(() => {
    if (!idle) return;
    let timeout: ReturnType<typeof setTimeout>;
    let inner: ReturnType<typeof setTimeout>;
    const loop = () => {
      timeout = setTimeout(
        () => {
          setBlink(true);
          inner = setTimeout(() => setBlink(false), 130);
          loop();
        },
        2400 + Math.random() * 3600,
      );
    };
    loop();
    return () => {
      clearTimeout(timeout);
      clearTimeout(inner);
    };
  }, [idle]);

  useEffect(() => {
    if (!track) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, dist / (r.width * 1.6));
        setEye({ x: (dx / dist) * pull * reach, y: (dy / dist) * pull * reach });

        const nx = Math.max(-1, Math.min(1, dx / (window.innerWidth / 2)));
        const ny = Math.max(-1, Math.min(1, dy / (window.innerHeight / 2)));
        setLean({
          x: nx * size * 0.055,
          y: ny * size * 0.045,
          rot: nx * 6,
        });
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [track, reach, size]);

  const open = blink ? 3 : hover ? 16 : 25;

  return (
    <span
      ref={ref}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={cn(
        "relative inline-block align-middle",
        track && "cursor-pointer",
        className,
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label="KaliGan AI employee"
    >
      <span
        className="orb-shadow"
        style={{
          width: size * 0.7,
          height: size * 0.12,
          bottom: -size * 0.1,
        }}
      />
      <span
        className={cn("orb-body orb-breathe block size-full")}
        style={{
          transform: `translate(${lean.x}px, ${lean.y}px) rotate(${lean.rot}deg)`,
          transition: "transform 420ms cubic-bezier(.22,1,.36,1)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          aria-hidden="true"
          className="relative block"
        >
          <g
            fill="#ffffff"
            style={{
              transform: `translate(${eye.x}px, ${eye.y}px)`,
              transition: "transform 220ms cubic-bezier(.22,1,.36,1)",
              filter: "drop-shadow(0 0 5px rgba(255,255,255,.45))",
            }}
          >
            <rect
              x="29"
              y={50 - open / 2}
              width="14"
              height={open}
              rx="7"
              style={{ transition: "y 90ms ease, height 90ms ease" }}
            />
            <rect
              x="57"
              y={50 - open / 2}
              width="14"
              height={open}
              rx="7"
              style={{ transition: "y 90ms ease, height 90ms ease" }}
            />
          </g>
        </svg>
        <span className="orb-sheen" />
      </span>
    </span>
  );
}
