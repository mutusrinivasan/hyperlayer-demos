import type { ReactNode } from 'react';
import { accentMap, type Accent } from '@/lib/accents';

interface ProductTileProps {
  icon: ReactNode;
  accent: Accent;
  title: string;
  subtitle?: ReactNode;
  rightValue?: ReactNode;
  progress?: number;
}

export default function ProductTile({
  icon,
  accent,
  title,
  subtitle,
  rightValue,
  progress,
}: ProductTileProps) {
  const { bg, text, fill } = accentMap[accent];
  const hasMetaRow = subtitle !== undefined || rightValue !== undefined;

  return (
    <div className="rounded-xl border border-hyperlayer-grey/10 bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bg} ${text}`}
        >
          {icon}
        </div>
        <p className="min-w-0 truncate text-sm font-semibold text-hyperlayer-grey">{title}</p>
      </div>

      {hasMetaRow && (
        // pl-11 = p-4 outer + icon w-8 + gap-3 = 44px — indents text column under the title.
        // If icon size or top-row gap changes, update this too.
        <div className="mt-2 flex items-center justify-between gap-3 pl-11">
          <div className="min-w-0 flex-1 text-xs">{subtitle}</div>
          {rightValue !== undefined && <div className="shrink-0">{rightValue}</div>}
        </div>
      )}

      {progress !== undefined && (
        <div className="mt-3 pl-11">
          <div className="h-1 overflow-hidden rounded-full bg-hyperlayer-grey/10">
            <div className={`h-full rounded-full ${fill}`} style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}
