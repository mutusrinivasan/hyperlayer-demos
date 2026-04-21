import { ArrowUpRight, ArrowDownLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrencyParts } from '@/lib/format';
import type { BankAccount } from '@/types/scenario';

interface AccountCardProps {
  account: BankAccount;
}

export default function AccountCard({ account }: AccountCardProps) {
  const { symbol, integer, decimal } = formatCurrencyParts(account.balance, 'en-GB');

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-hyperlayer-gradient-from to-hyperlayer-gradient-to p-6 text-white shadow-sm">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-80">
        <span>{account.name}</span>
        <span aria-hidden>·</span>
        <span>
          {account.sortCode} <span className="mx-1">••</span> {account.accountNumberLast4}
        </span>
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-medium">{symbol}</span>
        <span className="text-6xl font-semibold tracking-tight">{integer}</span>
        <span className="text-2xl font-medium opacity-80">{decimal}</span>
      </div>

      <div className="mt-8 flex gap-3">
        <Button
          variant="secondary"
          className="h-10 min-w-0 flex-1 gap-2 rounded-full bg-white px-5 text-hyperlayer-blue shadow-sm hover:bg-white/90"
        >
          <ArrowUpRight className="h-4 w-4" />
          Send
        </Button>
        <Button
          variant="secondary"
          className="h-10 min-w-0 flex-1 gap-2 rounded-full bg-white px-5 text-hyperlayer-blue shadow-sm hover:bg-white/90"
        >
          <ArrowDownLeft className="h-4 w-4" />
          Request
        </Button>
        <Button
          variant="secondary"
          className="h-10 min-w-0 flex-1 gap-2 rounded-full bg-white px-5 text-hyperlayer-blue shadow-sm hover:bg-white/90"
        >
          <Plus className="h-4 w-4" />
          Top up
        </Button>
      </div>
    </div>
  );
}
