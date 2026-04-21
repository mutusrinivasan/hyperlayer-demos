// Feed-home at `/` — neobank pattern (hero account + jar row + transactions)
// Products-home at `/products` — incumbent pattern (uniform product list)
// Sales picks the URL based on prospect buying psychology.

import AccountCard from '@/components/AccountCard';
import HomeShell, { HomeSidebar, MobileGreeting } from '@/components/HomeShell';
import JarList from '@/components/JarList';
import { retailUK } from '@/data/scenarios/retail-uk';

export default function FeedHome() {
  const { customer, account, jars } = retailUK;

  return (
    <HomeShell sidebar={<HomeSidebar customer={customer} />}>
      <MobileGreeting customer={customer} />
      <div className="mt-8 lg:mt-0">
        <AccountCard account={account} />
      </div>
      <div className="mt-6">
        <JarList jars={jars} />
      </div>
    </HomeShell>
  );
}
