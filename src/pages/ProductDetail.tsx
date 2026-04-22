import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronLeft,
  Minus,
  Plus,
  Receipt,
  type LucideIcon,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import ErrorState from '@/components/ErrorState';
import HomeShell, { HomeSidebar, MobileGreeting } from '@/components/HomeShell';
import AccountCardSkeleton from '@/components/skeletons/AccountCardSkeleton';
import TransactionListSkeleton from '@/components/skeletons/TransactionListSkeleton';
import TransactionList from '@/components/TransactionList';
import { useScenario } from '@/hooks/useScenario';
import { accentMap } from '@/lib/accents';
import { formatCurrency, formatCurrencyCompact } from '@/lib/format';
import { resolveProduct } from '@/lib/products';
import type { BankAccount, Jar, Scenario, Transaction } from '@/types/scenario';

const DEMO_TODAY = new Date('2026-04-21T12:00:00Z');

export default function ProductDetail() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { data: scenario, isError, refetch } = useScenario();

  return (
    <HomeShell sidebar={<HomeSidebar customer={scenario?.customer} />}>
      <MobileGreeting customer={scenario?.customer} />
      <div className="mt-8 lg:mt-0">
        {/* TODO: smart back-routing — if user arrived from /, back should go there.
            Currently always points to /products regardless of entry point. */}
        <Link
          to="/products"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-hyperlayer-blue"
        >
          <ChevronLeft className="h-4 w-4" />
          Products
        </Link>

        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !scenario ? (
          <DetailSkeleton />
        ) : (
          <DetailContent scenario={scenario} productSlug={productSlug} />
        )}
      </div>
    </HomeShell>
  );
}

function DetailContent({
  scenario,
  productSlug,
}: {
  scenario: Scenario;
  productSlug: string | undefined;
}) {
  const resolved = productSlug
    ? resolveProduct(productSlug, scenario)
    : ({ type: 'not-found' } as const);

  if (resolved.type === 'not-found') {
    return <NotFound />;
  }

  const scopedTxs = scenario.transactions.filter((t) => t.productSlug === productSlug);

  if (resolved.type === 'account') {
    return (
      <ProductBody
        hero={<AccountHero account={resolved.data} />}
        actions={<AccountActions />}
        transactions={scopedTxs}
      />
    );
  }

  return (
    <ProductBody
      hero={<JarHero jar={resolved.data} />}
      actions={<JarActions />}
      transactions={scopedTxs}
    />
  );
}

function DetailSkeleton() {
  return (
    <>
      <AccountCardSkeleton />
      <div className="mt-6 border-t border-hyperlayer-grey/10 pt-6">
        <TransactionListSkeleton />
      </div>
    </>
  );
}

function ProductBody({
  hero,
  actions,
  transactions,
}: {
  hero: React.ReactNode;
  actions: React.ReactNode;
  transactions: Transaction[];
}) {
  return (
    <>
      {hero}
      <div className="mt-6">{actions}</div>
      <div className="mt-6 border-t border-hyperlayer-grey/10 pt-6">
        {transactions.length > 0 ? (
          <TransactionList
            transactions={transactions}
            relativeTo={DEMO_TODAY}
            showSeeAll={false}
          />
        ) : (
          <EmptyTransactions />
        )}
      </div>
    </>
  );
}

function AccountHero({ account }: { account: BankAccount }) {
  return (
    <div>
      <h1 className="text-base font-semibold text-hyperlayer-grey">{account.name}</h1>
      <p className="mt-0.5 text-xs text-hyperlayer-text-secondary">
        {account.sortCode} · •• {account.accountNumberLast4}
      </p>
      <p className="mt-4 text-3xl font-semibold text-hyperlayer-grey">
        {formatCurrency(account.balance, 'en-GB')}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-hyperlayer-text-secondary">
        Available balance
      </p>
    </div>
  );
}

function JarHero({ jar }: { jar: Jar }) {
  const pct = Math.floor((jar.balance.amount / jar.targetBalance.amount) * 100);
  const { fill } = accentMap[jar.accent];

  return (
    <div>
      <h1 className="text-base font-semibold text-hyperlayer-grey">{jar.name}</h1>
      <p className="mt-0.5 text-xs text-hyperlayer-text-secondary">Savings goal</p>
      <p className="mt-4 text-3xl font-semibold text-hyperlayer-grey">
        {formatCurrencyCompact(jar.balance, 'en-GB')}
      </p>
      <p className="mt-1 text-xs uppercase tracking-wider text-hyperlayer-text-secondary">
        Saved so far
      </p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-hyperlayer-grey/10">
        <div className={`h-full rounded-full ${fill}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 grid grid-cols-3 text-xs text-hyperlayer-text-secondary">
        <span />
        <span className="text-center tabular-nums">{pct}%</span>
        <span className="text-right">
          {formatCurrencyCompact(jar.targetBalance, 'en-GB')} goal
        </span>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <button
      type="button"
      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-hyperlayer-blue px-5 text-sm font-medium text-white"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function AccountActions() {
  return (
    <div className="flex gap-3">
      <ActionButton icon={ArrowUpRight} label="Send" />
      <ActionButton icon={ArrowDownLeft} label="Request" />
      <ActionButton icon={Plus} label="Top up" />
    </div>
  );
}

function JarActions() {
  return (
    <div className="flex gap-3">
      <ActionButton icon={Plus} label="Add money" />
      <ActionButton icon={Minus} label="Withdraw" />
    </div>
  );
}

function EmptyTransactions() {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <Receipt className="h-10 w-10 text-hyperlayer-grey/20" />
      <p className="mt-3 text-sm text-hyperlayer-text-secondary">No activity yet</p>
      <p className="mt-1 text-xs text-hyperlayer-text-secondary/80">
        Transactions will appear here once you use this product
      </p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      <p className="text-sm text-hyperlayer-grey">Product not found</p>
      <Link to="/products" className="mt-3 text-sm font-medium text-hyperlayer-blue">
        Back to products
      </Link>
    </div>
  );
}
