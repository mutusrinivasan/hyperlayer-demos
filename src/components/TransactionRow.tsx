import { accentMap, resolveCategory } from '@/lib/accents';
import { formatTransactionAmount, formatTransactionDate } from '@/lib/format';
import type { Transaction } from '@/types/scenario';

interface TransactionRowProps {
  transaction: Transaction;
  relativeTo?: Date;
}

export default function TransactionRow({ transaction, relativeTo }: TransactionRowProps) {
  const { accent, Icon } = resolveCategory(transaction.category);
  const { bg, text } = accentMap[accent];
  const direction: 'in' | 'out' = transaction.type === 'salary' ? 'in' : 'out';
  const amountColor = direction === 'in' ? 'text-secondary-green' : 'text-red-700';

  return (
    <div className="flex items-center gap-3 py-3">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${bg} ${text}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-hyperlayer-grey">
          {transaction.merchantName}
        </p>
        <p className="text-xs text-hyperlayer-text-secondary">
          {transaction.category} · {formatTransactionDate(transaction.date, relativeTo)}
        </p>
      </div>
      <p className={`shrink-0 text-sm tabular-nums ${amountColor}`}>
        {formatTransactionAmount(transaction.amount, direction, 'en-GB')}
      </p>
    </div>
  );
}
