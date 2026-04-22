import TileIndent from '@/components/TileIndent';
import TileShell from '@/components/TileShell';
import { accentMap, iconMap } from '@/lib/accents';
import { formatCurrencyCompact } from '@/lib/format';
import type { Jar } from '@/types/scenario';

interface SavingsTileProps {
  jar: Jar;
}

export default function SavingsTile({ jar }: SavingsTileProps) {
  const { bg, text, fill } = accentMap[jar.accent];
  const Icon = iconMap[jar.icon];
  const pct = Math.floor((jar.balance.amount / jar.targetBalance.amount) * 100);

  return (
    <TileShell>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${text}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        <p className="min-w-0 truncate text-sm font-semibold text-hyperlayer-grey">{jar.name}</p>
      </div>

      <TileIndent className="mt-3">
        <p className="text-xl font-semibold text-hyperlayer-grey">
          {formatCurrencyCompact(jar.balance, 'en-GB')}
        </p>
        <p className="mt-0.5 text-xs text-hyperlayer-text-secondary">
          {formatCurrencyCompact(jar.targetBalance, 'en-GB')} goal
        </p>
      </TileIndent>

      <TileIndent className="mt-3">
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-hyperlayer-grey/10">
            <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs tabular-nums text-hyperlayer-text-secondary">{pct}%</span>
        </div>
      </TileIndent>
    </TileShell>
  );
}
