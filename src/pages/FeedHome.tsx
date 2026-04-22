// Feed-home at `/` — neobank pattern (hero account + jar row + transactions)
// Products-home at `/products` — incumbent pattern (uniform product list)
// Sales picks the URL based on prospect buying psychology.

import AccountCard from '@/components/AccountCard';
import HomeShell, { HomeSidebar, MobileGreeting } from '@/components/HomeShell';
import JarList from '@/components/JarList';
import TransactionList from '@/components/TransactionList';
import { retailUK } from '@/data/scenarios/retail-uk';

// Pin the demo's "today" to the seeded-data anchor so TODAY/YESTERDAY labels
// stay correct regardless of the real calendar date. Remove once the seeded
// transactions switch to relative day-offsets (see TODO in retail-uk.ts).
const DEMO_TODAY = new Date('2026-04-21T12:00:00Z');

export default function FeedHome() {
  const { customer, account, jars, transactions } = retailUK;

  return (
    <HomeShell sidebar={<HomeSidebar customer={customer} />}>
      <MobileGreeting customer={customer} />
      {/* AccountCard is the feed's hero representation of the current account.
          Intentionally NOT wrapped in <Link> — the user is already "on" this product
          in the feed context. Do not tap-wrap this later. */}
      <div className="mt-8 lg:mt-0">
        <AccountCard account={account} />
      </div>
      <div className="mt-6">
        <JarList jars={jars} />
      </div>
      <div className="mt-6">
        <TransactionList transactions={transactions} relativeTo={DEMO_TODAY} />
      </div>
    </HomeShell>
  );
}
