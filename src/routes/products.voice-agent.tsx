import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Phone, Mic, ShieldCheck } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { BotOrb } from "@/components/BotOrb";

export const Route = createFileRoute("/products/voice-agent")({
  head: () => ({
    meta: [
      { title: "Voice Employee — KaliGan AI" },
      {
        name: "description",
        content:
          "Forward the number you already advertise. The KaliGan Voice Employee answers on the first ring, transcribes, scores and routes every call.",
      },
      { property: "og:title", content: "Voice Employee — KaliGan AI" },
      {
        property: "og:description",
        content:
          "An AI employee that picks up your phone, day or night, and turns calls into scored leads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VoiceAgentPage,
});

const points = [
  {
    icon: Phone,
    title: "Bring your own number",
    body: "Forward the number on your ads. No new listings, no reprinting, no porting drama.",
  },
  {
    icon: Mic,
    title: "In-browser voice too",
    body: "Visitors press one button on your site and talk. Same brain, sub-second responses.",
  },
  {
    icon: Clock,
    title: "Answers at 2am",
    body: "Every call picked up on the first ring — including the ones your team never hears about.",
  },
  {
    icon: ShieldCheck,
    title: "Transcribed and traceable",
    body: "Real-time transcript, summary, and score attached to the lead record for every call.",
  },
];

function VoiceAgentPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>
        <section className="px-5 pt-20 pb-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center">
              <BotOrb size={92} reach={10} />
            </div>
            <div className="mt-8 text-xs tracking-[0.16em] text-muted-foreground">
              VOICE EMPLOYEE
            </div>
            <h1 className="font-display mt-4 text-[clamp(2.4rem,6.5vw,4.25rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
              Never miss another call.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Calls answered in 0.4 seconds, transcribed in real time, scored,
              and pushed to your team with a summary before they hang up.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/pricing" className="pill-solid">
                Start free <ArrowRight className="size-4" />
              </Link>
              <Link to="/contact" className="pill-ghost">
                Book a call
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-muted/40 px-5 py-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-background p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <BotOrb size={44} reach={7} />
              <div>
                <div className="text-sm font-medium">
                  Incoming call · +1 415 555 0134
                </div>
                <div className="text-xs text-muted-foreground">
                  Answered in 0.4s · transcribing
                </div>
              </div>
              <span className="ml-auto inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs">
                <span className="live-dot" /> LIVE
              </span>
            </div>

            <div className="mt-6 flex h-16 items-end gap-[3px]">
              {Array.from({ length: 48 }).map((_, i) => (
                <span
                  key={i}
                  className="wave-bar"
                  style={{ animationDelay: `${i * 55}ms` }}
                />
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm">
              <p className="text-muted-foreground">
                Caller: “Do you handle emergency leaks tonight?”
              </p>
              <p>
                KaliGan: “Yes — we have a crew on call until 11pm. I can dispatch
                to your postcode within 40 minutes. Shall I book it?”
              </p>
              <p className="text-muted-foreground">Caller: “Please do.”</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5 text-xs">
              {["Intent: emergency", "Score 96", "Routed to on-call", "Summary emailed"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                Voice that closes, not voicemail that waits.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 60}>
                  <article className="card-tile h-full transition-colors hover:border-foreground">
                    <p.icon className="size-5" />
                    <h3 className="font-display mt-5 text-xl font-medium tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Sub-second latency", "Barge-in supported", "Call recording", "Live handoff"].map(
                (f) => (
                  <li key={f} className="inline-flex items-center gap-2">
                    <Check className="size-4" /> {f}
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
