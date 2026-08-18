import { useCountUp } from "@/hooks/useReveal";

export function Stat({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-semibold tracking-tight tabular-nums">
        {prefix}
        {v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
