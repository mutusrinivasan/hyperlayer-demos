import { accentMap, iconMap } from '@/lib/accents';
import { formatCurrencyCompact } from '@/lib/format';
import type { Jar } from '@/types/scenario';

interface JarCardProps {
  jar: Jar;
}

export default function JarCard({ jar }: JarCardProps) {
  const accent = accentMap[jar.accent];
  const Icon = iconMap[jar.icon];
  const pct = Math.floor((jar.balance.amount / jar.targetBalance.amount) * 100);

  return (
    <div className="flex h-36 w-36 shrink-0 snap-start flex-col rounded-xl border border-hyperlayer-grey/10 bg-white p-3">
      <div className="flex items-start justify-between">
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${accent.bg}`}>
          <Icon className={`h-4 w-4 ${accent.text}`} />
        </div>
        <span className="text-xs font-medium text-hyperlayer-text-secondary">{pct}%</span>
      </div>

      <div className="mt-2 flex-1">
        <p className="truncate text-sm font-semibold text-hyperlayer-grey">{jar.name}</p>
        <p className="mt-1 text-xs">
          <span className="font-medium text-hyperlayer-grey">
            {formatCurrencyCompact(jar.balance, 'en-GB')}
          </span>
          <span className="text-hyperlayer-text-secondary">
            {' '}
            of {formatCurrencyCompact(jar.targetBalance, 'en-GB')}
          </span>
        </p>
      </div>

      <div className="mt-auto h-1 overflow-hidden rounded-full bg-hyperlayer-grey/10">
        <div className={`h-full rounded-full ${accent.fill}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
