import AccountCard from '@/components/AccountCard';
import PhoneFrame from '@/components/PhoneFrame';
import { retailUK } from '@/data/scenarios/retail-uk';

export default function Home() {
  const { customer, account } = retailUK;

  return (
    <div className="min-h-screen bg-hyperlayer-white">
      <div className="mx-auto max-w-2xl px-6 py-10 lg:max-w-none lg:flex lg:flex-row lg:items-start lg:justify-center lg:gap-16 lg:px-6 lg:py-16">
        <aside className="hidden lg:block lg:w-full lg:max-w-sm">
          <img src="/hyperlayer-logo.png" alt="Hyperlayer" className="h-8 w-auto" />
          <div className="mt-32">
            <p className="text-hyperlayer-text-secondary">Good afternoon,</p>
            <h1 className="text-4xl font-semibold text-hyperlayer-grey">
              {customer.firstName} {customer.lastName}
            </h1>
          </div>
        </aside>

        <PhoneFrame>
          <div className="lg:hidden">
            <img src="/hyperlayer-logo.png" alt="Hyperlayer" className="h-8 w-auto" />
            <div className="mt-10">
              <p className="text-hyperlayer-text-secondary">Good afternoon,</p>
              <h1 className="text-3xl font-semibold text-hyperlayer-grey">
                {customer.firstName} {customer.lastName}
              </h1>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <AccountCard account={account} />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
