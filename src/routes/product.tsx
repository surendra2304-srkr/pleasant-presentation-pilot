import { createFileRoute, Link } from "@tanstack/react-router";
import { BotOrb } from "@/components/BotOrb";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product — KaliGan AI chat and voice agents" },
      {
        name: "description",
        content:
          "How KaliGan AI works: ingest your business, deploy chat and voice agents, connect your own number, and get scored leads routed to your team.",
      },
      { property: "og:title", content: "Product — KaliGan AI chat and voice agents" },
      {
        property: "og:description",
        content:
          "Ingest, deploy, connect, convert — the four steps to a live AI employee.",
      },
    ],
  }),
  component: Product,
});

const steps = [
  {
    n: "01",
    title: "Ingest your business",
    body: "Paste your site URL and drop in PDFs, policies, price lists. Everything is embedded and scoped to your workspace only.",
  },
  {
    n: "02",
    title: "Deploy the employee",
    body: "One embed script gives you chat and in-browser voice on every page. Tone, questions, and handoff rules are yours to set.",
  },
  {
    n: "03",
    title: "Connect your number",
    body: "Point the number you already advertise at KaliGan. Calls are answered instantly, transcribed, and summarised.",
  },
  {
    n: "04",
    title: "Get qualified leads",
    body: "Every conversation ends as a scored lead with full transcript, routed to the right person by your own rules.",
  },
];

function Product() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="px-5 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <BotOrb size={64} />
          <h1 className="font-display mt-6 text-[clamp(2.25rem,6vw,4rem)] leading-[1] font-semibold tracking-[-0.045em]">
            How the employee works
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Four steps from a cold website to an AI teammate that never lets a
            lead slip.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          {steps.map((s) => (
            <div
              key={s.n}
              className="grid gap-3 border-t border-border/60 py-10 md:grid-cols-[90px_1fr]"
            >
              <div className="font-mono text-sm text-muted-foreground">{s.n}</div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {s.title}
                </h2>
                <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-4xl justify-center">
          <Link to="/pricing" className="pill-solid">
            See pricing
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
