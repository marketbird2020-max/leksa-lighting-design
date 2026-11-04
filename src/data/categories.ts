import raw from './leksa/categories.json'
import type { Category } from './types'

export const categories = raw as Category[]

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug)
export const getCategoryBySourceName = (sourceCategory: string) =>
  categories.find((c) => c.sourceCategory === sourceCategory)
