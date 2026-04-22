import JarCardSkeleton from '@/components/skeletons/JarCardSkeleton';

export default function JarListSkeleton() {
  return (
    <section aria-hidden>
      <header className="flex items-baseline justify-between">
        <div className="animate-pulse">
          <div className="h-4 w-28 rounded bg-hyperlayer-grey/10" />
          <div className="mt-1 h-2.5 w-44 rounded bg-hyperlayer-grey/10" />
        </div>
        <div className="h-3 w-14 animate-pulse rounded bg-hyperlayer-grey/10" />
      </header>

      <div className="mt-3 flex gap-3 overflow-hidden pr-4">
        <JarCardSkeleton />
        <JarCardSkeleton />
        <JarCardSkeleton />
      </div>
    </section>
  );
}
