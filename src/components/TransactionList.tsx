import TransactionRow from '@/components/TransactionRow';
import { formatTransactionDate } from '@/lib/format';
import type { Transaction } from '@/types/scenario';

interface TransactionListProps {
  transactions: Transaction[];
  relativeTo?: Date;
  showSeeAll?: boolean;
}

function dateKey(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate(),
  ).padStart(2, '0')}`;
}

function groupByDate(
  transactions: Transaction[],
): Array<{ key: string; transactions: Transaction[] }> {
  const groups: Record<string, Transaction[]> = {};
  for (const tx of transactions) {
    const key = dateKey(tx.date);
    (groups[key] ??= []).push(tx);
  }
  return Object.entries(groups)
    .map(([key, txs]) => ({
      key,
      transactions: [...txs].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    }))
    .sort((a, b) => b.key.localeCompare(a.key));
}

export default function TransactionList({
  transactions,
  relativeTo,
  showSeeAll = true,
}: TransactionListProps) {
  const groups = groupByDate(transactions);

  return (
    <section>
      <header className="flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-hyperlayer-grey">Recent transactions</h2>
        {showSeeAll && (
          <button type="button" className="text-sm font-medium text-hyperlayer-blue">
            See all
          </button>
        )}
      </header>

      {groups.map((group) => (
        <div key={group.key}>
          <p className="mt-4 text-xs uppercase tracking-wider text-hyperlayer-text-secondary">
            {formatTransactionDate(group.transactions[0].date, relativeTo).toUpperCase()}
          </p>
          <div className="mt-1 divide-y divide-hyperlayer-grey/10">
            {group.transactions.map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} relativeTo={relativeTo} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
