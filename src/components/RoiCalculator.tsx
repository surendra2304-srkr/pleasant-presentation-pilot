import { useState } from "react";

type Row = {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  set: (v: number) => void;
  prefix?: string;
};

export function RoiCalculator() {
  const [visitors, setVisitors] = useState(4000);
  const [calls, setCalls] = useState(120);
  const [value, setValue] = useState(400);

  const chatLeads = Math.round(visitors * 0.032);
  const missedCalls = Math.round(calls * 0.28);
  const extraLeads = chatLeads + missedCalls;
  const pipeline = extraLeads * value;
  const planCost = 149;
  const roi = Math.round(((pipeline - planCost) / planCost) * 100);

  const money = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const rows: Row[] = [
    {
      label: "Monthly website visitors",
      hint: "Unique sessions across your site",
      value: visitors,
      min: 500,
      max: 50000,
      step: 500,
      set: setVisitors,
    },
    {
      label: "Inbound calls / month",
      hint: "Everything that rings your team",
      value: calls,
      min: 10,
      max: 2000,
      step: 10,
      set: setCalls,
    },
    {
      label: "Average value of a lead",
      hint: "What one qualified lead is worth",
      value: value,
      min: 50,
      max: 5000,
      step: 50,
      set: setValue,
      prefix: "$",
    },
  ];

  const breakdown = [
    { label: "Chat leads captured", meta: "3.2% of visitors", value: chatLeads },
    { label: "Missed calls recovered", meta: "28% of inbound", value: missedCalls },
    { label: "Additional qualified leads", meta: "per month", value: extraLeads },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        {/* Inputs */}
        <div className="p-5 sm:p-7">
          <div className="text-[0.7rem] tracking-[0.16em] text-muted-foreground">
            YOUR NUMBERS
          </div>

          <div className="mt-5 divide-y divide-border">
            {rows.map((row) => (
              <label key={row.label} className="block py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {row.label}
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {row.hint}
                    </div>
                  </div>
                  <div className="rounded-full bg-secondary px-2.5 py-0.5">
                    <span className="font-display text-sm font-semibold tabular-nums text-secondary-foreground">
                      {row.prefix}
                      {row.value.toLocaleString()}
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min={row.min}
                  max={row.max}
                  step={row.step}
                  value={row.value}
                  onChange={(e) => row.set(Number(e.target.value))}
                  className="range-line mt-4 w-full"
                />
                <div className="mt-1.5 flex justify-between text-[0.65rem] tabular-nums text-muted-foreground">
                  <span>
                    {row.prefix}
                    {row.min.toLocaleString()}
                  </span>
                  <span>
                    {row.prefix}
                    {row.max.toLocaleString()}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="border-t border-border bg-card p-5 sm:p-7 md:border-t-0 md:border-l">
          <div className="text-[0.7rem] tracking-[0.16em] text-muted-foreground">
            ESTIMATED MONTHLY LIFT
          </div>
          <div className="font-display mt-3 text-[clamp(2rem,4.5vw,2.75rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums text-foreground">
            {money(pipeline)}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-muted-foreground">
              {extraLeads.toLocaleString()} extra leads / month
            </span>
            <span className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs text-muted-foreground">
              {roi.toLocaleString()}% return
            </span>
          </div>

          <dl className="mt-6 space-y-2">
            {breakdown.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-3 py-2"
              >
                <dt className="text-sm text-foreground">
                  {item.label}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.meta}
                  </span>
                </dt>
                <dd className="font-display text-sm font-semibold tabular-nums text-foreground">
                  {item.value.toLocaleString()}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm text-muted-foreground">Cost of Growth plan</span>
            <span className="font-display text-sm font-semibold tabular-nums text-foreground">
              {money(planCost)}/mo
            </span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Estimates based on typical capture rates. Your numbers stay in your
            browser.
          </p>
        </div>
      </div>
    </div>
  );
}
