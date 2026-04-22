import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductTile from '@/components/ProductTile';
import { formatCurrency } from '@/lib/format';
import { accountSlug } from '@/lib/slug';
import type { BankAccount } from '@/types/scenario';

interface AccountTileProps {
  account: BankAccount;
}

export default function AccountTile({ account }: AccountTileProps) {
  return (
    <Link
      to={`/products/${accountSlug()}`}
      className="block [&>div]:transition-colors hover:[&>div]:border-hyperlayer-grey/20 hover:[&>div]:shadow-sm"
    >
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
    </Link>
  );
}
