import type { Money } from '@/types/scenario';

export function formatCurrency(money: Money, locale?: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
  }).format(money.amount);
}

export function formatCurrencyCompact(money: Money, locale?: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(money.amount);
}

export interface CurrencyParts {
  symbol: string;
  integer: string;
  decimal: string;
}

export function formatCurrencyParts(money: Money, locale?: string): CurrencyParts {
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
  }).formatToParts(money.amount);

  let symbol = '';
  let integer = '';
  let decimal = '';

  for (const part of parts) {
    switch (part.type) {
      case 'currency':
        symbol += part.value;
        break;
      case 'integer':
      case 'group':
      case 'minusSign':
        integer += part.value;
        break;
      case 'decimal':
      case 'fraction':
        decimal += part.value;
        break;
    }
  }

  return { symbol, integer, decimal };
}

export function formatTransactionDate(iso: string, relativeTo: Date = new Date()): string {
  const d = new Date(iso);
  const truncate = (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const diffDays = Math.round((truncate(relativeTo) - truncate(d)) / 86_400_000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(d);
}

export function formatTransactionAmount(
  money: Money,
  direction: 'in' | 'out',
  locale?: string,
): string {
  const prefix = direction === 'in' ? '+' : '-';
  const abs = { amount: Math.abs(money.amount), currency: money.currency };
  return prefix + formatCurrency(abs, locale);
}
