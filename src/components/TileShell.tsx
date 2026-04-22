import type { ReactNode } from 'react';

interface TileShellProps {
  children: ReactNode;
}

export default function TileShell({ children }: TileShellProps) {
  return (
    <div className="rounded-xl border border-hyperlayer-grey/10 bg-white p-4">{children}</div>
  );
}
