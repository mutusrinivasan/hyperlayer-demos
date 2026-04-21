import type { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="lg:mx-auto lg:w-fit lg:rounded-[44px] lg:border lg:border-hyperlayer-grey/20 lg:bg-hyperlayer-grey lg:p-3 lg:shadow-2xl">
      <div className="lg:flex lg:h-[844px] lg:w-[390px] lg:flex-col lg:overflow-hidden lg:rounded-[32px] lg:bg-hyperlayer-white">
        <div
          aria-hidden
          className="mx-auto mt-3 hidden h-1 w-16 shrink-0 rounded-full bg-hyperlayer-grey/40 lg:block"
        />
        <div className="lg:flex-1 lg:overflow-y-auto lg:px-4 lg:pt-6 lg:pb-10">{children}</div>
      </div>
    </div>
  );
}
