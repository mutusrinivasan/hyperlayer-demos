import type { ReactNode } from 'react';
import { accentMap, type Accent } from '@/lib/accents';

interface ProductTileProps {
  icon: ReactNode;
  accent: Accent;
  title: string;
  subtitle: ReactNode;
  rightLabel?: string;
  progress?: number;
}

export default function ProductTile({
  icon,
  accent,
  title,
  subtitle,
  rightLabel,
  progress,
}: ProductTileProps) {
  const { bg, text, fill } = accentMap[accent];

  return (
    <div className="rounded-xl border border-hyperlayer-grey/10 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${text}`}
          >
            {icon}
          </div>
          <p className="truncate text-sm font-semibold text-hyperlayer-grey">{title}</p>
        </div>
        {rightLabel && (
          <span className="shrink-0 text-xs text-hyperlayer-text-secondary">{rightLabel}</span>
        )}
      </div>

      <div className="mt-2 text-xs">{subtitle}</div>

      {progress !== undefined && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-hyperlayer-grey/10">
          <div className={`h-full rounded-full ${fill}`} style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
