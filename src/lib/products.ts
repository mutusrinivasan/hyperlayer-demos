import { accountSlug, jarSlug } from '@/lib/slug';
import type { BankAccount, Jar, Scenario } from '@/types/scenario';

export type ResolvedProduct =
  | { type: 'account'; data: BankAccount }
  | { type: 'jar'; data: Jar }
  | { type: 'not-found' };

export function resolveProduct(slug: string, scenario: Scenario): ResolvedProduct {
  if (slug === accountSlug()) {
    return { type: 'account', data: scenario.account };
  }
  const jar = scenario.jars.find((j) => jarSlug(j) === slug);
  if (jar) {
    return { type: 'jar', data: jar };
  }
  return { type: 'not-found' };
}
