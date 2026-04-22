export default function ProductTileSkeleton({ withProgress = false }: { withProgress?: boolean }) {
  return (
    <div
      aria-hidden
      className="animate-pulse rounded-xl border border-hyperlayer-grey/10 bg-white p-4"
    >
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 shrink-0 rounded-full bg-hyperlayer-grey/10" />
        <div className="h-3 w-32 rounded bg-hyperlayer-grey/10" />
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 pl-11">
        <div className="h-2.5 w-40 flex-1 rounded bg-hyperlayer-grey/10" />
        <div className="h-3 w-16 shrink-0 rounded bg-hyperlayer-grey/10" />
      </div>

      {withProgress && (
        <div className="mt-3 pl-11">
          <div className="h-1 w-full rounded-full bg-hyperlayer-grey/10" />
        </div>
      )}
    </div>
  );
}
