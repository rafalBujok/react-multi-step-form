export const CURRENCIES = ['PLN', 'EUR', 'USD'] as const

export type Currency = (typeof CURRENCIES)[number]

export interface Product {
  id: string
  name: string
  sku: string
  description?: string
  manufacturer: string
  category: string
  features: string[]
  priceNet: number
  priceGross: number
  vatRate: number
  currency: Currency
  available: boolean
  limited: boolean
  stockQuantity?: number
  minCartQuantity: number
  maxCartQuantity: number
}
