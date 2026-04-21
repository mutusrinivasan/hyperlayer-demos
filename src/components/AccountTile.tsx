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
      title={account.name}
      rightLabel="Current account"
      subtitle={
        <>
          <span className="font-medium text-hyperlayer-grey">
            {formatCurrency(account.balance, 'en-GB')}
          </span>
          <span className="text-hyperlayer-text-secondary">
            {' '}
            · {account.sortCode} · •• {account.accountNumberLast4}
          </span>
        </>
      }
    />
  );
}
