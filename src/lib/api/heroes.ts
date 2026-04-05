import { api } from './client'
import type { Hero } from '../types'

export const heroesApi = {
  getByStoreId: async (storeId: string, includeItems = true): Promise<Hero[]> => 
    api.get<Hero[]>(`/stores/${storeId}/heroes?includeItems=${includeItems}`),

  getActiveByStoreId: async (storeId: string): Promise<Hero[]> =>
    api.get<Hero[]>(`/stores/${storeId}/heroes/active`),

  getById: async (storeId: string, heroId: string, includeItems = true): Promise<Hero> =>
    api.get<Hero>(`/stores/${storeId}/heroes/${heroId}?includeItems=${includeItems}`),
}
