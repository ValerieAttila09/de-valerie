export function Marquee({ items }: { items: string[] }) {
  const row = items.join("  /  ");
  return (
    <div aria-hidden className="overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee whitespace-nowrap font-mono text-xs uppercase tracking-[0.35em] text-muted">
        {[0, 1].map((i) => (
          <span key={i} className="pr-8">
            {row}  /  {row}  /  {row}  /
          </span>
        ))}
      </div>
    </div>
  );
}
