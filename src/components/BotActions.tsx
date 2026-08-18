import { useState } from "react";
import {
  CalendarClock,
  FileSpreadsheet,
  Globe,
  Inbox,
  Link2,
  MessageSquare,
  Phone,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    icon: Globe,
    title: "Uses the browser",
    body: "It opens the web, compares options, fills forms, and comes back with a decision instead of a list of links.",
  },
  {
    icon: Inbox,
    title: "Works your inbox",
    body: "Reads the thread, pulls the context, and drafts the reply in your voice. Nothing sends without your yes.",
  },
  {
    icon: CalendarClock,
    title: "Owns the calendar",
    body: "Holds slots, books meetings, reschedules the awkward ones, and protects your focus blocks.",
  },
  {
    icon: FileSpreadsheet,
    title: "Handles the records",
    body: "Sheets, CRM entries, invoices and tickets updated the moment something changes — with a trail of what it touched.",
  },
  {
    icon: Phone,
    title: "Answers the phone",
    body: "Picks up on the first ring at 2 AM, understands the caller, and books or escalates before anyone hangs up.",
  },
  {
    icon: Terminal,
    title: "Runs the tools",
    body: "Connected to the systems your team already lives in, scoped to exactly the access you grant it.",
  },
];

const integrations = [
  "Gmail",
  "Google Sheets",
  "Calendar",
  "Slack",
  "Notion",
  "HubSpot",
  "Salesforce",
  "LinkedIn",
  "Stripe",
  "WhatsApp",
  "Zendesk",
  "Drive",
];

const day = [
  ["2:14 AM", "Answered an enquiry from Dubai and booked a viewing for Saturday."],
  ["6:40 AM", "Enriched 61 prospects and drafted the morning outbound queue."],
  ["9:05 AM", "Cleared the inbox to zero and parked five threads that need a human line."],
  ["1:30 PM", "Rescheduled a clash, held the client slot, and told everyone why."],
  ["7:26 PM", "Filed the expense report and flagged one duplicate receipt."],
  ["11:25 PM", "Wrote tomorrow's plan and asked for approval on the two risky calls."],
];

export function BotActions() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => (
          <div key={a.title} className="card-tile transition-colors hover:border-foreground">
            <a.icon className="size-5" />
            <h3 className="font-display mt-4 text-lg font-medium tracking-tight">
              {a.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="card-tile">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted-foreground">
            <MessageSquare className="size-3.5" /> A DAY WITH YOUR AI EMPLOYEE
          </div>
          <div className="mt-5 space-y-1">
            {day.map(([time, text], i) => (
              <button
                key={time}
                onMouseEnter={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                onClick={() => setOpen(i)}
                className={cn(
                  "flex w-full items-start gap-4 rounded-xl px-3 py-2.5 text-left transition-colors",
                  i === open ? "bg-muted" : "hover:bg-muted/60",
                )}
              >
                <span className="w-16 shrink-0 pt-0.5 text-xs text-muted-foreground">
                  {time}
                </span>
                <span className="text-sm">{text}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card-tile">
          <div className="flex items-center gap-2 text-xs tracking-[0.16em] text-muted-foreground">
            <Link2 className="size-3.5" /> CONNECTED TO YOUR STACK
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {integrations.map((n) => (
              <span
                key={n}
                className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              >
                {n}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Sign in once. Your AI employee inherits only the access you grant, and every
            action it takes in your tools is written to the audit log.
          </p>
        </div>
      </div>
    </div>
  );
}
