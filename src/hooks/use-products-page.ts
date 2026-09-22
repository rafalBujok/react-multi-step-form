import { parseAsInteger, useQueryState } from 'nuqs'

export function useProductsPage() {
  return useQueryState('page', parseAsInteger.withDefault(1))
}
