import TransactionRowSkeleton from '@/components/skeletons/TransactionRowSkeleton';

export default function TransactionListSkeleton() {
  return (
    <section aria-hidden>
      <header className="flex items-baseline justify-between">
        <div className="h-4 w-40 animate-pulse rounded bg-hyperlayer-grey/10" />
        <div className="h-3 w-12 animate-pulse rounded bg-hyperlayer-grey/10" />
      </header>

      <div className="mt-4">
        <div className="h-2.5 w-14 animate-pulse rounded bg-hyperlayer-grey/10" />
        <div className="mt-1 divide-y divide-hyperlayer-grey/10">
          <TransactionRowSkeleton />
          <TransactionRowSkeleton />
          <TransactionRowSkeleton />
          <TransactionRowSkeleton />
        </div>
      </div>
    </section>
  );
}
