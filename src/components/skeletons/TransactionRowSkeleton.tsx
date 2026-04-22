export default function TransactionRowSkeleton() {
  return (
    <div aria-hidden className="flex animate-pulse items-center gap-3 py-3">
      <div className="h-9 w-9 shrink-0 rounded-full bg-hyperlayer-grey/10" />
      <div className="min-w-0 flex-1">
        <div className="h-3 w-28 rounded bg-hyperlayer-grey/10" />
        <div className="mt-1.5 h-2.5 w-20 rounded bg-hyperlayer-grey/10" />
      </div>
      <div className="h-3 w-14 shrink-0 rounded bg-hyperlayer-grey/10" />
    </div>
  );
}
