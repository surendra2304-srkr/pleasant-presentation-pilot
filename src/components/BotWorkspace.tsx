import { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  Clock,
  Loader2,
  Mic,
  Monitor,
  Plus,
  Search,
  Send,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Item =
  | { kind: "bot"; text: string }
  | { kind: "you"; text: string }
  | { kind: "event"; text: string }
  | {
      kind: "action";
      tool: string;
      text: string;
      status: "running" | "done" | "approval";
      steps: string[];
    };

type Thread = {
  id: string;
  name: string;
  time: string;
  preview: string;
  tone: string;
  script: Item[];
};

const threads: Thread[] = [
  {
    id: "chief",
    name: "Revenue Desk",
    time: "3:26 AM",
    preview: "booked the venue and sent the contract",
    tone: "oklch(0.72 0.11 175)",
    script: [
      { kind: "bot", text: "Morning. Your week is planned and three things need you." },
      { kind: "you", text: "Start with the offsite. Find a venue in Bengaluru for 24 people on the 12th." },
      {
        kind: "action",
        tool: "Browser",
        text: "Comparing 9 venues on availability, price, and travel time from the office.",
        status: "done",
        steps: ["Shortlisted 3 venues", "Checked calendars", "Requested quotes"],
      },
      {
        kind: "action",
        tool: "Contracts",
        text: "Venue booked at The Tamarind, 12th, 9 AM–6 PM. Contract sent for your signature.",
        status: "approval",
        steps: ["₹1,84,000 total", "Free cancellation until the 5th"],
      },
      { kind: "bot", text: "I'll chase the signature tomorrow if it's still open." },
    ],
  },
  {
    id: "outbound",
    name: "Pipeline Employee",
    time: "11:25 PM",
    preview: "Done.",
    tone: "oklch(0.78 0.15 60)",
    script: [
      { kind: "bot", text: "Hey Surendra, good to meet you. What do you want me around for — anything specific, or general support across the day?" },
      {
        kind: "you",
        text: "Overnight pipeline generation and outbound. Pick eligible prospects from this sheet, research them, and draft email and LinkedIn sequences in my voice.",
      },
      { kind: "event", text: "Renamed to Pipeline Employee" },
      { kind: "bot", text: "Checking what's connected. Sheets, Gmail, and LinkedIn are already signed in. The CRM isn't." },
      {
        kind: "action",
        tool: "Computer",
        text: "Sign in to your CRM so I can see the accounts you own.",
        status: "done",
        steps: ["Access granted", "412 accounts synced"],
      },
      {
        kind: "action",
        tool: "Research",
        text: "Enriched 61 prospects with funding, hiring signals, and tech stack.",
        status: "done",
        steps: ["18 flagged as high intent", "7 dropped as bad fit"],
      },
      {
        kind: "action",
        tool: "Drafts",
        text: "18 email sequences and 12 LinkedIn notes written in your voice, queued for 9 AM.",
        status: "running",
        steps: ["Waiting on your approval to send"],
      },
      { kind: "bot", text: "Done. Everything's in your drafts folder — nothing leaves without your yes." },
    ],
  },
  {
    id: "inbox",
    name: "Customer Support",
    time: "8:26 PM",
    preview: "inbox at zero, 5 drafts parked",
    tone: "oklch(0.65 0.16 265)",
    script: [
      { kind: "bot", text: "Cleared 142 emails today. Five need a human line from you." },
      { kind: "you", text: "Show me only the ones tied to revenue." },
      {
        kind: "action",
        tool: "Inbox",
        text: "Three revenue threads: a renewal question, a pricing push-back, and a partner intro.",
        status: "done",
        steps: ["Replies drafted", "Context attached from the CRM"],
      },
      { kind: "bot", text: "Inbox is at zero. The rest was archived with a note on why." },
    ],
  },
  {
    id: "accounts",
    name: "Sales Employee",
    time: "6:26 PM",
    preview: "invite's out to Vicky, note added",
    tone: "oklch(0.62 0.19 300)",
    script: [
      { kind: "bot", text: "Two accounts went quiet this week. Want me to re-engage them?" },
      { kind: "you", text: "Yes, but keep it warm — no templates." },
      {
        kind: "action",
        tool: "Outreach",
        text: "Personal check-ins sent, referencing their last two tickets and the roadmap item they asked for.",
        status: "done",
        steps: ["Meeting invite out to Vicky", "Health score updated"],
      },
    ],
  },
  {
    id: "talent",
    name: "People Employee",
    time: "3:26 PM",
    preview: "3 intros drafted, calls held",
    tone: "oklch(0.6 0.14 230)",
    script: [
      { kind: "bot", text: "Screened 48 applicants against the role brief overnight." },
      { kind: "you", text: "Who's actually worth a call?" },
      {
        kind: "action",
        tool: "Screening",
        text: "Three candidates clear the bar on shipped work, not keywords.",
        status: "done",
        steps: ["Intros drafted", "Slots held Thursday"],
      },
    ],
  },
  {
    id: "expense",
    name: "Finance Employee",
    time: "7:26 PM",
    preview: "report filed, nothing outstanding",
    tone: "oklch(0.7 0.17 40)",
    script: [
      { kind: "bot", text: "Nine receipts came in. All matched to card transactions." },
      { kind: "you", text: "File it before the cut-off." },
      {
        kind: "action",
        tool: "Finance",
        text: "Report filed and routed for approval. One duplicate removed.",
        status: "done",
        steps: ["₹42,180 total", "Policy checked"],
      },
    ],
  },
];

const statusStyles: Record<string, string> = {
  running: "bg-muted text-muted-foreground",
  done: "bg-[oklch(0.94_0.06_150)] text-[oklch(0.42_0.11_150)]",
  approval: "bg-[oklch(0.95_0.07_85)] text-[oklch(0.45_0.11_75)]",
};

const statusLabel: Record<string, string> = {
  running: "Working",
  done: "Done",
  approval: "Needs you",
};

function ActionCard({ item }: { item: Extract<Item, { kind: "action" }> }) {
  const Icon =
    item.status === "done" ? Check : item.status === "approval" ? ShieldCheck : Loader2;
  return (
    <div className="fade-up rounded-2xl border border-border bg-background p-4">
      <div className="flex items-center gap-2">
        <Monitor className="size-4" />
        <span className="text-sm font-medium">{item.tool}</span>
        <span
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium",
            statusStyles[item.status],
          )}
        >
          <Icon className={cn("size-3", item.status === "running" && "animate-spin")} />
          {statusLabel[item.status]}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{item.text}</p>
      <ul className="mt-3 space-y-1.5">
        {item.steps.map((s) => (
          <li key={s} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="size-3.5" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BotWorkspace() {
  const [active, setActive] = useState(1);
  const [step, setStep] = useState(1);
  const [typing, setTyping] = useState(false);
  const [query, setQuery] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  const thread = threads[active]!;
  const visible = useMemo(() => thread.script.slice(0, step), [thread, step]);

  useEffect(() => {
    setStep(1);
    setTyping(false);
  }, [active]);

  useEffect(() => {
    if (step >= thread.script.length) return;
    const next = thread.script[step]!;
    const isBot = next.kind !== "you";
    const showTyping = setTimeout(() => setTyping(isBot), 200);
    const advance = setTimeout(
      () => {
        setTyping(false);
        setStep((s) => s + 1);
      },
      isBot ? 1900 : 1200,
    );
    return () => {
      clearTimeout(showTyping);
      clearTimeout(advance);
    };
  }, [step, thread]);

  useEffect(() => {
    scroller.current?.scrollTo({
      top: scroller.current.scrollHeight,
      behavior: "smooth",
    });
  }, [visible, typing]);

  const list = threads.filter((t) =>
    t.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="window">
      <div className="grid md:grid-cols-[260px_1fr]">
        {/* Thread list */}
        <aside className="hidden border-r border-border/60 md:flex md:flex-col">
          <div className="flex items-center gap-2 px-4 py-3.5">
            <span className="size-3 rounded-full bg-[oklch(0.72_0.16_25)]" />
            <span className="size-3 rounded-full bg-[oklch(0.83_0.15_85)]" />
            <span className="size-3 rounded-full bg-[oklch(0.78_0.15_150)]" />
            <Plus className="ml-auto size-4 text-muted-foreground" />
          </div>
          <div className="px-3">
            <div className="flex items-center gap-2 rounded-xl bg-muted px-3 py-2">
              <Search className="size-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="mt-2 flex-1 space-y-0.5 overflow-y-auto p-2">
            {list.map((t) => {
              const i = threads.indexOf(t);
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                    i === active ? "bg-muted" : "hover:bg-muted/60",
                  )}
                >
                  <span
                    className="mt-0.5 size-7 shrink-0 rounded-full"
                    style={{ background: t.tone }}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate text-sm font-medium">{t.name}</span>
                      <span className="ml-auto shrink-0 text-[0.7rem] text-muted-foreground">
                        {t.time}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                      {t.preview}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Conversation */}
        <div className="flex min-h-[460px] flex-col">
          <div className="flex items-center gap-2.5 border-b border-border/60 px-4 py-3.5">
            <span
              className="size-5 rounded-full"
              style={{ background: thread.tone }}
            />
            <span className="text-sm font-medium">{thread.name}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[0.7rem] text-muted-foreground">
              <Clock className="size-3" /> always on
            </span>
            <Monitor className="ml-auto size-4 text-muted-foreground" />
          </div>

          <div
            ref={scroller}
            className="max-h-[420px] flex-1 space-y-3 overflow-y-auto p-5"
          >
            {visible.map((item, i) => {
              if (item.kind === "you")
                return (
                  <div key={i} className="msg-you fade-up ml-auto whitespace-pre-line">
                    {item.text}
                  </div>
                );
              if (item.kind === "bot")
                return (
                  <div key={i} className="msg-bot fade-up">
                    {item.text}
                  </div>
                );
              if (item.kind === "event")
                return (
                  <div
                    key={i}
                    className="fade-up py-1 text-center text-xs text-muted-foreground"
                  >
                    {item.text}
                  </div>
                );
              return <ActionCard key={i} item={item} />;
            })}
            {typing && (
              <div className="msg-bot inline-flex gap-1">
                <span className="dot" />
                <span className="dot [animation-delay:150ms]" />
                <span className="dot [animation-delay:300ms]" />
              </div>
            )}
          </div>

          <div className="border-t border-border/60 p-3">
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-2">
              <Plus className="size-4 text-muted-foreground" />
              <span className="flex-1 text-sm text-muted-foreground">
                Message {thread.name}
              </span>
              <Mic className="size-4 text-muted-foreground" />
              <span className="flex size-7 items-center justify-center rounded-full bg-foreground text-background">
                <Send className="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
