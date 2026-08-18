import { useEffect, useRef, useState } from "react";
import { MessageSquare, Mic, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/** Frame-driven mini "videos" for the products nav panel. */
function useLoop(steps: number, ms: number, key: string) {
  const [frame, setFrame] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    ref.current = 0;
    setFrame(0);
    const id = setInterval(() => {
      ref.current = (ref.current + 1) % steps;
      setFrame(ref.current);
    }, ms);
    return () => clearInterval(id);
  }, [steps, ms, key]);
  return frame;
}

const chatScript = [
  { from: "bot", text: "Hi! Are you looking for a quote today?" },
  { from: "user", text: "Yes — for a 3-bed rewire." },
  { from: "bot", text: "Got it. What postcode are you in?" },
  { from: "user", text: "SW9 8LN, ideally next week." },
  { from: "bot", text: "Booked Tuesday 10am. Lead scored 92." },
] as const;

export function ChatPreview({ playKey }: { playKey: string }) {
  // 2 ticks per message: typing, then delivered
  const frame = useLoop(chatScript.length * 2 + 2, 620, playKey);
  const shown = Math.min(Math.floor(frame / 2), chatScript.length);
  const typing = frame % 2 === 0 && shown < chatScript.length;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-muted/50 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MessageSquare className="size-3.5" /> Chat Employee
        <span className="ml-auto inline-flex items-center gap-1.5">
          <span className="live-dot" /> live
        </span>
      </div>

      <div className="mt-3 flex flex-1 flex-col justify-end gap-2">
        {chatScript.slice(0, shown).map((m, i) => (
          <div
            key={m.text}
            className={cn(
              "fade-up max-w-[86%] rounded-2xl border border-border/50 bg-card px-3.5 py-2 text-[12.5px] leading-snug shadow-[0_8px_20px_-18px_oklch(0_0_0/0.5)]",
              m.from === "user"
                ? "ml-auto text-right text-foreground"
                : "text-muted-foreground",
            )}
            style={{ animationDelay: `${i * 20}ms` }}
          >
            {m.text}
          </div>
        ))}

        {typing && (
          <div
            className={cn(
              "fade-up flex w-fit items-center gap-1 rounded-2xl border border-border/50 bg-card px-3.5 py-2.5",
              chatScript[shown]?.from === "user" && "ml-auto",
            )}
          >
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="size-1.5 rounded-full bg-foreground/45"
                style={{
                  animation: "bounce-dot 900ms ease-in-out infinite",
                  animationDelay: `${d * 140}ms`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const voiceLines = [
  "Caller: Do you handle emergency leaks tonight?",
  "KaliGan: Yes — a crew is on call until 11pm.",
  "Caller: Great, can you come out now?",
  "KaliGan: Dispatching to SW9 in 40 minutes.",
] as const;

export function VoicePreview({ playKey }: { playKey: string }) {
  const frame = useLoop(voiceLines.length + 2, 900, playKey);
  const shown = Math.min(frame, voiceLines.length);
  const bars = 34;

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-muted/50 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Mic className="size-3.5" /> Voice Employee
        <span className="ml-auto inline-flex items-center gap-1.5">
          <span className="live-dot" /> 00:0{Math.min(frame, 9)}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2.5 rounded-2xl border border-border/50 bg-card px-3.5 py-2.5">
        <Phone className="size-3.5 text-muted-foreground" />
        <span className="text-[12.5px]">+1 415 555 0134</span>
        <span className="ml-auto text-[11px] text-muted-foreground">
          answered 0.4s
        </span>
      </div>

      <div className="mt-3 flex h-10 items-end gap-[3px]">
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="wave-bar flex-1"
            style={{ animationDelay: `${i * 55}ms` }}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-1 flex-col justify-end gap-1.5">
        {voiceLines.slice(0, shown).map((l, i) => (
          <p
            key={l}
            className={cn(
              "fade-up text-[12.5px] leading-snug",
              l.startsWith("Caller") ? "text-muted-foreground" : "text-foreground",
            )}
            style={{ animationDelay: `${i * 20}ms` }}
          >
            {l}
          </p>
        ))}
      </div>

      {shown >= voiceLines.length && (
        <div className="fade-up mt-3 flex flex-wrap gap-1.5">
          {["Intent: emergency", "Score 96", "Routed"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
