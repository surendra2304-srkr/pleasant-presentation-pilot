import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — KaliGan AI plans from $49/month" },
      {
        name: "description",
        content:
          "Simple KaliGan AI pricing: Starter at $49/month, Growth at $149/month, and custom Enterprise plans. 14-day money-back guarantee.",
      },
      { property: "og:title", content: "Pricing — KaliGan AI plans from $49/month" },
      {
        property: "og:description",
        content:
          "Starter $49, Growth $149, Enterprise custom. 14-day money-back guarantee.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    body: "For one site, one number, one hard-working employee.",
    features: [
      "1 voice agent",
      "1 chat agent",
      "500 qualification minutes",
      "Website + document knowledge base",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/month",
    body: "For teams running multiple funnels at once.",
    features: [
      "3 voice agents",
      "3 chat agents",
      "Unlimited knowledge documents",
      "Priority email support",
      "Lead scoring + routing rules",
    ],
    cta: "Start free",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    body: "For white-label deployments and dedicated compute.",
    features: [
      "White-labeling",
      "Custom SLAs",
      "Dedicated compute instances",
      "Onboarding + solution engineering",
    ],
    cta: "Talk to sales",
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1] font-semibold tracking-[-0.045em]">
            Pricing that scales with leads
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Every plan includes chat, in-browser voice, and a 14-day
            money-back guarantee. No questions asked.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <article
              key={p.name}
              className={cn(
                "card-tile flex flex-col",
                p.featured && "bg-foreground text-background",
              )}
            >
              <div className="text-sm font-medium">{p.name}</div>
              <div className="font-display mt-4 flex items-end gap-1">
                <span className="text-4xl font-semibold tracking-[-0.04em]">
                  {p.price}
                </span>
                <span
                  className={cn(
                    "pb-1 text-sm",
                    p.featured ? "text-background/60" : "text-muted-foreground",
                  )}
                >
                  {p.period}
                </span>
              </div>
              <p
                className={cn(
                  "mt-3 text-sm",
                  p.featured ? "text-background/70" : "text-muted-foreground",
                )}
              >
                {p.body}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={cn(
                  "mt-8 justify-center",
                  p.featured ? "pill-inverse" : "pill-solid",
                )}
              >
                {p.cta}
              </Link>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
