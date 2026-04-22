import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { adaptScenario } from '@/lib/adapter';
import type { Scenario } from '@/types/scenario';

// Exported for mutation-invalidation in sub-prompt 4 (write tools / Top up flow).
export const SCENARIO_QUERY_KEY = ['scenario'] as const;

export function useScenario() {
  return useQuery({
    queryKey: SCENARIO_QUERY_KEY,
    queryFn: async (): Promise<Scenario> => {
      const [profile, jars, transactions] = await Promise.all([
        api.getCustomerProfile(),
        api.getJars(),
        api.getTransactions(),
      ]);
      return adaptScenario(profile, jars, transactions);
    },
  });
}
