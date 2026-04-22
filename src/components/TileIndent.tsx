import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TileIndentProps {
  children: ReactNode;
  className?: string;
}

// Indents content to align under the tile title (past the icon column).
// Contract: matches TileShell p-4 + icon row w-8 + gap-3 = 44px.
// If icon size or top-row gap changes, update this constant here.
export default function TileIndent({ children, className }: TileIndentProps) {
  return <div className={cn('pl-11', className)}>{children}</div>;
}
