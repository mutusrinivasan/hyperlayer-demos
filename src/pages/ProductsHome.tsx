// Feed-home at `/` — neobank pattern (hero account + jar row + transactions)
// Products-home at `/products` — incumbent pattern (uniform product list)
// Sales picks the URL based on prospect buying psychology.

import AccountTile from '@/components/AccountTile';
import HomeShell, { HomeSidebar, MobileGreeting } from '@/components/HomeShell';
import SavingsTile from '@/components/SavingsTile';
import { retailUK } from '@/data/scenarios/retail-uk';

export default function ProductsHome() {
  const { customer, account, jars } = retailUK;

  return (
    <HomeShell sidebar={<HomeSidebar customer={customer} />}>
      <MobileGreeting customer={customer} />
      <section className="mt-8 lg:mt-0">
        <header>
          <h2 className="text-base font-semibold text-hyperlayer-grey">Your products</h2>
        </header>
        <div className="mt-3 space-y-3">
          <AccountTile account={account} />
          {jars.map((jar) => (
            <SavingsTile key={jar.id} jar={jar} />
          ))}
        </div>
      </section>
    </HomeShell>
  );
}
