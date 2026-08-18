import { Link } from "@tanstack/react-router";
import { BotOrb } from "./BotOrb";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 px-5 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <BotOrb size={24} />
            <span className="font-display text-base font-semibold tracking-tight">
              KaliGan AI
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The AI employee that chats, talks, and turns visitors into qualified
            leads. Built in Bangalore, India.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm text-muted-foreground">
          <Link to="/product" className="hover:text-foreground">
            Product
          </Link>
          <Link to="/pricing" className="hover:text-foreground">
            Pricing
          </Link>
          <Link to="/contact" className="hover:text-foreground">
            Contact
          </Link>
          <a href="mailto:support@kaligan.ai" className="hover:text-foreground">
            support@kaligan.ai
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} KaliGan AI. All rights reserved.
      </div>
    </footer>
  );
}
