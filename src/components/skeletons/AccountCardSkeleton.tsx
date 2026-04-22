export default function AccountCardSkeleton() {
  return (
    <div
      aria-hidden
      className="relative animate-pulse overflow-hidden rounded-2xl bg-gradient-to-r from-hyperlayer-gradient-from to-hyperlayer-gradient-to p-6 text-white shadow-sm"
    >
      <div className="h-3 w-48 rounded bg-white/20" />

      <div className="mt-6 flex items-baseline gap-2">
        <div className="h-8 w-6 rounded bg-white/20" />
        <div className="h-12 w-40 rounded bg-white/20" />
        <div className="h-6 w-10 rounded bg-white/20" />
      </div>

      <div className="mt-8 flex gap-3">
        <div className="h-10 flex-1 rounded-full bg-white/20" />
        <div className="h-10 flex-1 rounded-full bg-white/20" />
        <div className="h-10 flex-1 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
