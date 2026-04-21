import ProductTile from '@/components/ProductTile';
import { iconMap } from '@/lib/accents';
import { formatCurrencyCompact } from '@/lib/format';
import type { Jar } from '@/types/scenario';

interface SavingsTileProps {
  jar: Jar;
}

export default function SavingsTile({ jar }: SavingsTileProps) {
  const Icon = iconMap[jar.icon];
  const pct = Math.floor((jar.balance.amount / jar.targetBalance.amount) * 100);

  return (
    <ProductTile
      icon={<Icon className="h-4 w-4" />}
      accent={jar.accent}
      title={jar.name}
      rightLabel="Savings goal"
      subtitle={
        <>
          <span className="font-medium text-hyperlayer-grey">
            {formatCurrencyCompact(jar.balance, 'en-GB')}
          </span>
          <span className="text-hyperlayer-text-secondary">
            {' '}
            of {formatCurrencyCompact(jar.targetBalance, 'en-GB')} · {pct}%
          </span>
        </>
      }
      progress={pct}
    />
  );
}
