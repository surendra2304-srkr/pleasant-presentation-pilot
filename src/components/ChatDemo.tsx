import { useEffect, useRef, useState } from "react";
import { Mic, Send } from "lucide-react";
import { BotOrb } from "@/components/BotOrb";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "you"; text: string };

type Scenario = {
  id: string;
  label: string;
  company: string;
  greeting: string;
  stats: [string, string][];
  qa: { q: string; a: string }[];
};

const scenarios: Scenario[] = [
  {
    id: "realty",
    label: "Real estate",
    company: "Northline Realty",
    greeting:
      "Hi — I'm the KaliGan employee for Northline Realty. What are you looking for?",
    stats: [
      ["Website chat", "5 leads today"],
      ["Inbound calls", "12 answered"],
      ["Missed follow-ups", "0 open"],
      ["Knowledge base", "38 docs"],
    ],
    qa: [
      {
        q: "A 3BHK near Indiranagar, under 1.8Cr",
        a: "Four listings match. The closest is a 1,640 sq ft 3BHK on 12th Main at 1.72Cr. Want me to hold a viewing?",
      },
      {
        q: "Can I see it on Saturday morning?",
        a: "Booked for Saturday 10:30. Lead scored 92 and routed to Priya with the full transcript.",
      },
      {
        q: "What's the loan process like?",
        a: "We pre-check eligibility with three partner banks; typical sanction is 6–9 working days. I've emailed you the document checklist.",
      },
    ],
  },
  {
    id: "clinic",
    label: "Clinic",
    company: "Meridian Dental",
    greeting:
      "Hello — Meridian Dental's assistant here. Booking, pricing, or insurance?",
    stats: [
      ["Appointments booked", "9 today"],
      ["After-hours calls", "6 answered"],
      ["No-show reminders", "22 sent"],
      ["Knowledge base", "16 docs"],
    ],
    qa: [
      {
        q: "How much is a root canal?",
        a: "Single-root canals are ₹6,500 and molars ₹9,000, including the crown consult. Both are covered under our EMI plan.",
      },
      {
        q: "Do you take Star Health?",
        a: "Yes — Star Health is in-network for procedures over ₹5,000. I can pre-fill the claim form with your policy number.",
      },
      {
        q: "Any slot tomorrow evening?",
        a: "Dr. Rao has 6:15 PM and 7:00 PM open. I'll hold 6:15 and text you a confirmation link.",
      },
    ],
  },
  {
    id: "agency",
    label: "Agency",
    company: "Fold Studio",
    greeting:
      "Hey — Fold Studio's AI employee. Tell me about the project and I'll scope it.",
    stats: [
      ["Briefs qualified", "7 this week"],
      ["Calls answered", "4 today"],
      ["Proposals triggered", "3 sent"],
      ["Knowledge base", "24 docs"],
    ],
    qa: [
      {
        q: "We need a rebrand plus a new site",
        a: "That's our Identity + Web track: 8–10 weeks, starting at $34k. I've logged it as a qualified brief.",
      },
      {
        q: "What's your timeline for October?",
        a: "One production slot is open from Oct 6. I've provisionally reserved it for 72 hours.",
      },
      {
        q: "Can you share past work?",
        a: "Sent three case studies matching your sector to your inbox, plus a link to book a 20-minute call with Dan.",
      },
    ],
  },
];

export function ChatDemo() {
  const [active, setActive] = useState(0);
  const scenario = scenarios[active]!;
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: scenario.greeting },
  ]);
  const [typing, setTyping] = useState(false);
  const [asked, setAsked] = useState<number[]>([]);
  const [draft, setDraft] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ from: "bot", text: scenarios[active]!.greeting }]);
    setAsked([]);
    setTyping(false);
  }, [active]);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const send = (text: string, answer: string, index?: number) => {
    if (typing) return;
    if (index !== undefined) setAsked((a) => [...a, index]);
    setMessages((m) => [...m, { from: "you", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "bot", text: answer }]);
    }, 900);
  };

  const remaining = scenario.qa
    .map((item, i) => ({ ...item, i }))
    .filter((item) => !asked.includes(item.i));

  return (
    <div className="window">
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 px-4 py-3">
        <span className="size-3 rounded-full bg-[oklch(0.72_0.16_25)]" />
        <span className="size-3 rounded-full bg-[oklch(0.83_0.15_85)]" />
        <span className="size-3 rounded-full bg-[oklch(0.78_0.15_150)]" />
        <div className="ml-2 flex items-center gap-2 text-xs text-muted-foreground">
          <BotOrb size={14} idle={false} track={false} />
          {scenario.company} · live session
        </div>
        <div className="ml-auto flex gap-1">
          {scenarios.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={cn(
                "rounded-full px-3 py-1 text-xs transition-colors",
                i === active
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-border/60 p-3 md:block">
          {scenario.stats.map(([a, b]) => (
            <div
              key={a}
              className="rounded-xl px-3 py-2.5 transition-colors hover:bg-muted"
            >
              <div className="text-sm font-medium">{a}</div>
              <div className="text-xs text-muted-foreground">{b}</div>
            </div>
          ))}
          <div className="mt-4 rounded-xl bg-muted p-3">
            <div className="flex items-center gap-2 text-xs font-medium">
              <Mic className="size-3.5" /> Voice ready
            </div>
            <div className="mt-2 flex h-6 items-end gap-[3px]">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="wave-bar"
                  style={{ animationDelay: `${i * 70}ms` }}
                />
              ))}
            </div>
          </div>
        </aside>

        <div className="flex min-h-[360px] flex-col">
          <div
            ref={scroller}
            className="max-h-[320px] flex-1 space-y-3 overflow-y-auto p-5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "you" ? "msg-you fade-up ml-auto" : "msg-bot fade-up"
                }
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="msg-bot inline-flex gap-1">
                <span className="dot" />
                <span className="dot [animation-delay:150ms]" />
                <span className="dot [animation-delay:300ms]" />
              </div>
            )}
          </div>

          <div className="border-t border-border/60 p-3">
            {remaining.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {remaining.map((item) => (
                  <button
                    key={item.i}
                    onClick={() => send(item.q, item.a, item.i)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    {item.q}
                  </button>
                ))}
              </div>
            )}
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                send(
                  draft.trim(),
                  "I only answer from " +
                    scenario.company +
                    "'s own documents — in the real deployment this is where your grounded answer appears, or a clean hand-off to a human.",
                );
                setDraft("");
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Ask ${scenario.company} anything…`}
                className="field mt-0 flex-1"
              />
              <button type="submit" className="pill-solid px-3.5" aria-label="Send">
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
