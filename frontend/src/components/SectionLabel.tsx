export function SectionLabel({
  index,
  title,
  meta,
}: {
  index: string;
  title: string;
  meta?: string;
}) {
  return (
    <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
      <span className="flex items-center gap-3">
        <span className="inline-block size-1.5 bg-accent" aria-hidden />
        {index} / {title}
      </span>
      {meta ? <span>{meta}</span> : null}
    </div>
  );
}
