import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Check,
  Compass,
  Play,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { BotOrb } from "@/components/BotOrb";
import { BotWorkspace } from "@/components/BotWorkspace";
import { BotActions } from "@/components/BotActions";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { RoiCalculator } from "@/components/RoiCalculator";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KaliGan AI — AI employees for the modern enterprise" },
      {
        name: "description",
        content:
          "KaliGan AI Employees think, plan, and execute across your entire business — so your people can focus on what matters most.",
      },
      {
        property: "og:title",
        content: "KaliGan AI — AI employees for the modern enterprise",
      },
      {
        property: "og:description",
        content:
          "KaliGan AI Employees think, plan, and execute across your entire business — so your people can focus on what matters most.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: Brain,
    name: "Think",
    title: "It understands the whole business",
    body: "Every employee is grounded in your own knowledge — sites, documents, policies, pricing — and re-indexed as that knowledge changes.",
    detail: ["Private knowledge graph", "Weekly re-index", "Source-traceable answers"],
  },
  {
    icon: Compass,
    name: "Plan",
    title: "It decides what should happen next",
    body: "Objectives, guardrails, and escalation thresholds you set. The employee chooses the path — and knows when a human should take over.",
    detail: ["Objective-driven flows", "Confidence thresholds", "Human-in-the-loop"],
  },
  {
    icon: Workflow,
    name: "Execute",
    title: "It finishes the work, not the demo",
    body: "Bookings made, records written, tickets routed, follow-ups sent — connected to the systems your team already lives in.",
    detail: ["CRM + webhooks", "Calendar and inbox", "Full audit trail"],
  },
];

const departments = [
  ["Revenue", "Employees that qualify demand, book meetings, and keep pipeline hygiene perfect without a single reminder."],
  ["Support", "Front-line resolution grounded in your policies, escalating only what genuinely needs a person."],
  ["Operations", "Routine coordination — dispatch, scheduling, status chasing — handled the moment it appears."],
  ["Finance", "Invoice questions, renewal chases, and reconciliation prep, all with a traceable record."],
  ["People", "Onboarding answers, policy lookups, and internal requests resolved in seconds, in any language."],
  ["Enterprise IT", "Deployed inside your boundaries, with private data, audit logs, and role-scoped access."],
];

const testimonials = [
  {
    quote:
      "We stopped losing the 9pm enquiries. The employee handles them end to end and my team wakes up to a clean list.",
    name: "Priya Nair",
    role: "Sales lead, Northline Realty",
  },
  {
    quote:
      "It answers policy questions more accurately than our front desk, because it only reads what we gave it.",
    name: "Dr. Ashwin Rao",
    role: "Founder, Meridian Dental",
  },
  {
    quote:
      "Half our inbound was unqualified. Now the work that reaches a human already has context attached.",
    name: "Dan Okafor",
    role: "Partner, Fold Studio",
  },
];

const logos = [
  "NORTHLINE",
  "MERIDIAN",
  "FOLD STUDIO",
  "ARCWAY",
  "BLUEPINE",
  "HELIOS LABS",
  "KETTLE & CO",
  "VANTA WORKS",
];

function Home() {
  const [quote, setQuote] = useState(0);
  const [pillar, setPillar] = useState(0);



  useEffect(() => {
    const t = setInterval(
      () => setQuote((q) => (q + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-5 pt-10 pb-14 md:pt-14">
          <div className="relative mx-auto max-w-4xl text-center">
            <Link to="/products/chat-agent" className="announce">
              <span>AI EMPLOYEES FOR THE MODERN ENTERPRISE</span>
              <ArrowUpRight className="size-3.5" />
            </Link>


            <h1 className="font-display mt-10 text-[clamp(2.6rem,8vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
              The{" "}
              <BotOrb
                size={72}
                reach={10}
                className="mx-1 !h-[0.78em] !w-[0.78em] translate-y-[0.06em]"
              />{" "}
              Future
              <br />
              Works for You.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              KaliGan AI Employees think, plan, and execute across your entire
              business—so you can focus on what matters most.
            </p>



            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/pricing" className="pill-solid">
                Start free <ArrowRight className="size-4" />
              </Link>
              <Link to="/products/chat-agent" className="pill-ghost">
                <Play className="size-4" /> See an employee work
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5" /> No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5" /> 5-minute setup
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3.5" /> Cancel anytime
              </span>
            </div>



          </div>
        </section>

        {/* Logo marquee */}
        <section className="border-y border-border/60 py-6">
          <p className="mb-5 text-center text-xs tracking-[0.16em] text-muted-foreground">
            TEAMS ALREADY RUNNING AI EMPLOYEES
          </p>
          <div className="marquee">
            <div className="marquee-track">
              {[...logos, ...logos].map((l, i) => (
                <span
                  key={i}
                  className="font-display px-8 text-sm font-semibold tracking-[0.18em] text-muted-foreground/70"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Message your AI employee */}
        <section id="chat" className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <div className="text-xs tracking-[0.16em] text-muted-foreground">
                WORK WITH IT LIKE A COLLEAGUE
              </div>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                Message your AI employee.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Hand over the task the way you'd hand it to a colleague. It
                takes the work from start to end, learns how your business
                runs, and comes back when your approval is needed.
              </p>
            </Reveal>

            <Reveal className="mt-10">
              <BotWorkspace />
            </Reveal>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                ["Give it the goal", "Plain language, no flowcharts, no prompt engineering."],
                ["Watch it work", "Every step, tool and decision is visible while it runs."],
                ["Approve the risky bits", "Nothing that spends money or leaves the building goes out without you."],
              ].map(([t, b]) => (
                <div key={t} className="card-tile">
                  <h3 className="font-display text-base font-medium tracking-tight">
                    {t}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Think. Plan. Execute. */}
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <div className="text-xs tracking-[0.16em] text-muted-foreground">
                HOW AN EMPLOYEE WORKS
              </div>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                Think. Plan. Execute.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Not a workflow you have to draw. An employee that reasons about
                your business and gets the work finished.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
              <div className="flex flex-col gap-3">
                {pillars.map((p, i) => (
                  <button
                    key={p.name}
                    onClick={() => setPillar(i)}
                    onMouseEnter={() => setPillar(i)}
                    className={cn(
                      "rounded-3xl border p-5 text-left transition-colors",
                      i === pillar
                        ? "border-foreground"
                        : "border-transparent hover:border-border",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          "font-display flex size-9 shrink-0 items-center justify-center rounded-full text-sm",
                          i === pillar
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-display text-lg font-medium tracking-tight">
                          {p.name}
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {p.title}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="rounded-3xl border border-border bg-card p-8">
                {(() => {
                  const p = pillars[pillar]!;
                  const Icon = p.icon;
                  return (
                    <>
                      <Icon className="size-6" />
                      <h3 className="font-display mt-6 text-2xl font-semibold tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground">{p.body}</p>
                      <ul className="mt-6 space-y-3 text-sm">
                        {p.detail.map((d) => (
                          <li key={d} className="flex gap-3">
                            <Check className="mt-0.5 size-4 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>



        {/* What it actually does */}
        <section id="actions" className="px-5 pb-24">
          <Reveal className="mx-auto mb-10 max-w-2xl">
            <div className="text-xs tracking-[0.16em] text-muted-foreground">
              WHAT IT ACTUALLY DOES
            </div>
            <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
              It doesn't just answer. It acts.
            </h2>
          </Reveal>
          <BotActions />
        </section>




        {/* Departments */}
        <section className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <div className="text-xs tracking-[0.16em] text-muted-foreground">
                WHERE THEY WORK
              </div>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                An employee for every function.
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {departments.map(([label, body], i) => (
                <div key={label} className="bg-background p-7">
                  <div className="font-display text-xs tracking-[0.16em] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display mt-3 text-xl font-semibold tracking-tight">
                    {label}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How you go live */}
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <div className="text-xs tracking-[0.16em] text-muted-foreground">
                HOW YOU GO LIVE
              </div>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                Hired in an afternoon.
              </h2>
              <p className="mt-4 text-muted-foreground">
                No migration, no rebuild, no new tool for your team to learn.
                Point it at what you already have and it starts working.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {[
                ["01", "Point it at your knowledge", "Website, documents, policies, pricing. It reads everything once and stays current."],
                ["02", "Set the guardrails", "What it can decide alone, what needs a human, and when to escalate."],
                ["03", "Connect the tools", "Calendar, inbox, CRM, helpdesk — whatever your team already lives in."],
                ["04", "Let it work", "It runs from day one and improves as more of your business flows through it."],
              ].map(([n, t, b]) => (
                <div key={n} className="card-tile">
                  <div className="font-display text-xs tracking-[0.16em] text-muted-foreground">
                    {n}
                  </div>
                  <h3 className="font-display mt-3 text-lg font-medium tracking-tight">
                    {t}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI */}
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mb-8 max-w-2xl">
              <div className="text-xs tracking-[0.16em] text-muted-foreground">
                WHAT IT'S WORTH
              </div>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                Do the maths first.
              </h2>
            </Reveal>
            <RoiCalculator />
          </div>
        </section>


        {/* Stats */}

        <section className="border-y border-border/60 px-5 py-14">
          <div className="mx-auto grid max-w-6xl gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            <Stat value={24} suffix="/7" label="Coverage, no shifts" />
            <Stat value={4.7} decimals={1} suffix="min" label="Average time to go live" />
            <Stat value={38} suffix="%" label="More work completed" />
            <Stat value={100} suffix="%" label="Grounded in your data" />
          </div>
        </section>

        {/* Trust */}
        <section className="bg-muted/40 px-5 py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="text-xs tracking-[0.16em] text-muted-foreground">
                ENTERPRISE READY
              </div>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                Your data stays yours.
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Every employee is scoped to your workspace, answers only from
                what you gave it, and leaves an audit trail for every action it
                takes on your behalf.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/product" className="pill-solid">
                  Explore the platform
                </Link>
                <Link to="/contact" className="pill-ghost">
                  Book a call
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Private by default", "Workspace-scoped knowledge, never shared or trained on."],
                ["Traceable answers", "Every response points back to the source it came from."],
                ["Role-scoped access", "Employees only reach the systems you explicitly connect."],
                ["Full audit log", "Every action, escalation and handoff is recorded."],
              ].map(([t, b]) => (
                <div
                  key={t}
                  className="rounded-3xl border border-border bg-background p-6"
                >
                  <ShieldCheck className="size-5" />
                  <h3 className="font-display mt-4 text-lg font-medium tracking-tight">
                    {t}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-5 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div key={quote} className="fade-up">
              <p className="font-display text-[clamp(1.4rem,3.2vw,2.1rem)] leading-[1.25] font-medium tracking-[-0.03em]">
                “{testimonials[quote]!.quote}”
              </p>
              <div className="mt-6 text-sm text-muted-foreground">
                {testimonials[quote]!.name} · {testimonials[quote]!.role}
              </div>
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuote(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={cn(
                    "h-1.5 w-8 rounded-full transition-colors",
                    i === quote ? "bg-foreground" : "bg-border",
                  )}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
              Common questions.
            </h2>
            <div className="mt-8">
              <Faq />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-24">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-border bg-card px-6 py-20 text-center">
            <div className="flex justify-center">
              <BotOrb size={72} reach={9} />
            </div>
            <h2 className="font-display mt-8 text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-semibold tracking-[-0.045em]">
              Hire your first AI employee.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
              Live in five minutes. No credit card, no migration, no new tools
              for your team to learn.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/pricing" className="pill-solid">
                Start free <ArrowRight className="size-4" />
              </Link>
              <Link to="/contact" className="pill-ghost">
                Talk to sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
