export default function JarCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex h-36 w-36 shrink-0 animate-pulse flex-col rounded-xl border border-hyperlayer-grey/10 bg-white p-3"
    >
      <div className="flex items-start justify-between">
        <div className="h-8 w-8 rounded-full bg-hyperlayer-grey/10" />
        <div className="h-3 w-8 rounded bg-hyperlayer-grey/10" />
      </div>

      <div className="mt-2 flex-1">
        <div className="h-3 w-20 rounded bg-hyperlayer-grey/10" />
        <div className="mt-2 h-2.5 w-24 rounded bg-hyperlayer-grey/10" />
      </div>

      <div className="mt-auto h-1 w-full rounded-full bg-hyperlayer-grey/10" />
    </div>
  );
}
