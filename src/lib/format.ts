import type { Money } from '@/types/scenario';

export function formatCurrency(money: Money, locale?: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
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
