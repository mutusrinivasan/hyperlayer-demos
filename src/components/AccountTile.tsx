import { Wallet } from 'lucide-react';
import ProductTile from '@/components/ProductTile';
import { formatCurrency } from '@/lib/format';
import type { BankAccount } from '@/types/scenario';

interface AccountTileProps {
  account: BankAccount;
}

export default function AccountTile({ account }: AccountTileProps) {
  return (
    <ProductTile
      icon={<Wallet className="h-4 w-4" />}
      accent="grey"
      title="Current account"
      subtitle={
        <span className="text-hyperlayer-text-secondary">
          {account.sortCode} · •• {account.accountNumberLast4}
        </span>
      }
      rightValue={
        <span className="text-base font-semibold text-hyperlayer-grey">
          {formatCurrency(account.balance, 'en-GB')}
        </span>
      }
    />
  );
}
