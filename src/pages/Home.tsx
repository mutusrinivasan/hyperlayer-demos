import AccountCard from '@/components/AccountCard';
import { retailUK } from '@/data/scenarios/retail-uk';

export default function Home() {
  return (
    <div className="min-h-screen bg-hyperlayer-white">
      <div className="mx-auto max-w-2xl px-6 py-10">
        <img src="/hyperlayer-logo.png" alt="Hyperlayer" className="h-8 w-auto" />

        <div className="mt-10">
          <p className="text-hyperlayer-text-secondary">Good afternoon,</p>
          <h1 className="text-3xl font-semibold text-hyperlayer-grey">
            {retailUK.customer.firstName} {retailUK.customer.lastName}
          </h1>
        </div>

        <div className="mt-8">
          <AccountCard account={retailUK.account} />
        </div>
      </div>
    </div>
  );
}
