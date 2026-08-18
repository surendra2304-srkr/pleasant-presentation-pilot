import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Globe, FileText, ShieldCheck, Zap } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ChatDemo } from "@/components/ChatDemo";
import { Reveal } from "@/components/Reveal";
import { BotOrb } from "@/components/BotOrb";

export const Route = createFileRoute("/products/chat-agent")({
  head: () => ({
    meta: [
      { title: "Chat Employee — KaliGan AI" },
      {
        name: "description",
        content:
          "The KaliGan Chat Employee answers every website visitor, asks the questions your best salesperson would ask, and hands over a scored lead.",
      },
      { property: "og:title", content: "Chat Employee — KaliGan AI" },
      {
        property: "og:description",
        content:
          "An AI employee that answers visitors, qualifies them live, and routes scored leads to your team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatAgentPage,
});

const points = [
  {
    icon: Globe,
    title: "Grounded in your site",
    body: "Point it at a URL. It crawls, chunks, and re-indexes weekly so answers never drift from what you actually sell.",
  },
  {
    icon: FileText,
    title: "Reads your documents",
    body: "Price lists, policies, brochures and FAQs are embedded into the same index the voice agent uses.",
  },
  {
    icon: Zap,
    title: "Qualifies, not collects",
    body: "It asks budget, timeline and intent, scores 0–100, and only escalates the conversations worth a human.",
  },
  {
    icon: ShieldCheck,
    title: "Never invents",
    body: "Out-of-scope questions trigger a handoff instead of a hallucination. Every answer is traceable to a source.",
  },
];

function ChatAgentPage() {
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
              CHAT EMPLOYEE
            </div>
            <h1 className="font-display mt-4 text-[clamp(2.4rem,6.5vw,4.25rem)] leading-[0.98] font-semibold tracking-[-0.045em]">
              Answer every visitor instantly.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Add it to your site and it answers questions, qualifies buyers, and
              books meetings — around the clock.
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

        <section className="px-5 pb-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <ChatDemo />
            </Reveal>
          </div>
        </section>

        <section className="border-t border-border/60 px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal className="max-w-2xl">
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.04em]">
                What makes it different from a chatbot.
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
              {["One-line embed", "Multilingual", "CRM + webhooks", "Full transcripts"].map(
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
