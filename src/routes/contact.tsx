import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BotOrb } from "@/components/BotOrb";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact KaliGan AI — talk to the team" },
      {
        name: "description",
        content:
          "Get in touch with KaliGan AI for demos, pricing, or support. Email info@kaligan.ai or support@kaligan.ai, available 24/7.",
      },
      { property: "og:title", content: "Contact KaliGan AI — talk to the team" },
      {
        property: "og:description",
        content: "Demos, pricing, and 24/7 support from the KaliGan AI team.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main className="px-5 py-20">
        <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-2">
          <div>
            <BotOrb size={56} />
            <h1 className="font-display mt-6 text-[clamp(2rem,5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.045em]">
              Let's get your employee hired
            </h1>
            <p className="mt-5 max-w-sm text-muted-foreground">
              Tell us about your business and we'll show you the agent answering
              questions about it — live, on a call.
            </p>
            <dl className="mt-10 space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">General</dt>
                <dd>info@kaligan.ai</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Support (24/7)</dt>
                <dd>support@kaligan.ai</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Headquarters</dt>
                <dd>Bangalore, India</dd>
              </div>
            </dl>
          </div>

          <form
            className="card-tile"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Thanks — we'll be in touch within one business day.");
            }}
          >
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Name</span>
                <input required className="field" placeholder="Your name" />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">Work email</span>
                <input
                  required
                  type="email"
                  className="field"
                  placeholder="you@company.com"
                />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">Website</span>
                <input className="field" placeholder="company.com" />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">
                  What should the employee handle?
                </span>
                <textarea
                  rows={4}
                  className="field resize-none"
                  placeholder="Inbound calls, website chat, booking viewings…"
                />
              </label>
            </div>
            <button type="submit" className="pill-solid mt-6 w-full justify-center">
              {sent ? "Request sent" : "Request a demo"}
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
