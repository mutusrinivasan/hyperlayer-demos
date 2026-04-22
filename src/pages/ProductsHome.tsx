// Feed-home at `/` — neobank pattern (hero account + jar row + transactions)
// Products-home at `/products` — incumbent pattern (uniform product list)
// Sales picks the URL based on prospect buying psychology.

import AccountTile from '@/components/AccountTile';
import ErrorState from '@/components/ErrorState';
import HomeShell, { HomeSidebar, MobileGreeting } from '@/components/HomeShell';
import SavingsTile from '@/components/SavingsTile';
import ProductTileSkeleton from '@/components/skeletons/ProductTileSkeleton';
import { useScenario } from '@/hooks/useScenario';

export default function ProductsHome() {
  const { data: scenario, isError, refetch } = useScenario();

  return (
    <HomeShell sidebar={<HomeSidebar customer={scenario?.customer} />}>
      <MobileGreeting customer={scenario?.customer} />
      <section className="mt-8 lg:mt-0">
        <header>
          <h2 className="text-base font-semibold text-hyperlayer-grey">Your products</h2>
        </header>
        {isError ? (
          <ErrorState onRetry={() => refetch()} />
        ) : !scenario ? (
          <div className="mt-3 space-y-3">
            <ProductTileSkeleton />
            <ProductTileSkeleton withProgress />
            <ProductTileSkeleton withProgress />
            <ProductTileSkeleton withProgress />
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <AccountTile account={scenario.account} />
            {scenario.jars.map((jar) => (
              <SavingsTile key={jar.id} jar={jar} />
            ))}
          </div>
        )}
      </section>
    </HomeShell>
  );
}
