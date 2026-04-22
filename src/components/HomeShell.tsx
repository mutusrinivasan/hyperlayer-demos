import type { ReactNode } from 'react';
import PhoneFrame from '@/components/PhoneFrame';
import type { Customer } from '@/types/scenario';

interface HomeShellProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export default function HomeShell({ sidebar, children }: HomeShellProps) {
  return (
    <div className="min-h-screen bg-hyperlayer-white">
      <div className="mx-auto max-w-2xl px-6 py-10 lg:flex lg:max-w-none lg:flex-row lg:items-start lg:justify-center lg:gap-16 lg:px-6 lg:py-16">
        <aside className="hidden lg:block lg:w-full lg:max-w-sm">{sidebar}</aside>
        <PhoneFrame>{children}</PhoneFrame>
      </div>
    </div>
  );
}

export function HomeSidebar({ customer }: { customer?: Customer }) {
  return (
    <>
      <img src="/hyperlayer-logo.png" alt="Hyperlayer" className="h-8 w-auto" />
      <div className="mt-16">
        {customer ? (
          <>
            <p className="text-hyperlayer-text-secondary">Good afternoon,</p>
            <h1 className="text-4xl font-semibold text-hyperlayer-grey">
              {customer.firstName} {customer.lastName}
            </h1>
          </>
        ) : (
          <div aria-hidden className="animate-pulse">
            <div className="h-4 w-32 rounded bg-hyperlayer-grey/10" />
            <div className="mt-2 h-8 w-56 rounded bg-hyperlayer-grey/10" />
          </div>
        )}
      </div>
    </>
  );
}

export function MobileGreeting({ customer }: { customer?: Customer }) {
  return (
    <div className="lg:hidden">
      <img src="/hyperlayer-logo.png" alt="Hyperlayer" className="h-8 w-auto" />
      <div className="mt-10">
        {customer ? (
          <>
            <p className="text-hyperlayer-text-secondary">Good afternoon,</p>
            <h1 className="text-3xl font-semibold text-hyperlayer-grey">
              {customer.firstName} {customer.lastName}
            </h1>
          </>
        ) : (
          <div aria-hidden className="animate-pulse">
            <div className="h-4 w-28 rounded bg-hyperlayer-grey/10" />
            <div className="mt-2 h-7 w-48 rounded bg-hyperlayer-grey/10" />
          </div>
        )}
      </div>
    </div>
  );
}
