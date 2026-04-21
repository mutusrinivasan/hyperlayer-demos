import JarCard from '@/components/JarCard';
import type { Jar } from '@/types/scenario';

interface JarListProps {
  jars: Jar[];
}

export default function JarList({ jars }: JarListProps) {
  return (
    <section>
      <header className="flex items-baseline justify-between">
        <div>
          <h2 className="text-base font-semibold text-hyperlayer-grey">Savings jars</h2>
          <p className="text-xs text-hyperlayer-text-secondary">
            Goals you&apos;re putting money aside for
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-medium text-hyperlayer-blue"
        >
          View all
        </button>
      </header>

      <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-4 scroll-smooth [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {jars.map((jar) => (
          <JarCard key={jar.id} jar={jar} />
        ))}
      </div>
    </section>
  );
}
