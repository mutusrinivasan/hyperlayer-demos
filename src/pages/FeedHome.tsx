// Feed-home at `/` — neobank pattern (hero account + jar row + transactions)
// Products-home at `/products` — incumbent pattern (uniform product list)
// Sales picks the URL based on prospect buying psychology.

import AccountCard from '@/components/AccountCard';
import ErrorState from '@/components/ErrorState';
import HomeShell, { HomeSidebar, MobileGreeting } from '@/components/HomeShell';
import JarList from '@/components/JarList';
import AccountCardSkeleton from '@/components/skeletons/AccountCardSkeleton';
import JarListSkeleton from '@/components/skeletons/JarListSkeleton';
import TransactionListSkeleton from '@/components/skeletons/TransactionListSkeleton';
import TransactionList from '@/components/TransactionList';
import { useScenario } from '@/hooks/useScenario';

// Pin the demo's "today" to the seeded-data anchor so TODAY/YESTERDAY labels
// stay correct regardless of the real calendar date. Remove once the seeded
// transactions switch to relative day-offsets (see TODO in retail-uk.ts / seed.ts).
const DEMO_TODAY = new Date('2026-04-21T12:00:00Z');

export default function FeedHome() {
  const { data: scenario, isError, refetch } = useScenario();

  return (
    <HomeShell sidebar={<HomeSidebar customer={scenario?.customer} />}>
      <MobileGreeting customer={scenario?.customer} />
      {isError ? (
        <div className="mt-8 lg:mt-0">
          <ErrorState onRetry={() => refetch()} />
        </div>
      ) : !scenario ? (
        <>
          <div className="mt-8 lg:mt-0">
            <AccountCardSkeleton />
          </div>
          <div className="mt-6">
            <JarListSkeleton />
          </div>
          <div className="mt-6">
            <TransactionListSkeleton />
          </div>
        </>
      ) : (
        <>
          {/* AccountCard is the feed's hero representation of the current account.
              Intentionally NOT wrapped in <Link> — the user is already "on" this product
              in the feed context. Do not tap-wrap this later. */}
          <div className="mt-8 lg:mt-0">
            <AccountCard account={scenario.account} />
          </div>
          <div className="mt-6">
            <JarList jars={scenario.jars} />
          </div>
          <div className="mt-6">
            <TransactionList transactions={scenario.transactions} relativeTo={DEMO_TODAY} />
          </div>
        </>
      )}
    </HomeShell>
  );
}
