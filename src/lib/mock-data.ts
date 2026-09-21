import { CURRENCIES } from './types'
import type { Currency, Product } from './types'

export { CURRENCIES }

export const DEFAULT_CURRENCY: Currency = 'PLN'

export const MANUFACTURERS = ['Apple', 'Samsung', 'Sony', 'Bosch', 'Xiaomi', 'Lenovo'] as const

export const CATEGORIES = ['Elektronika', 'AGD', 'Komputery', 'Akcesoria', 'Wearables'] as const

export const FEATURES = [
  'Bluetooth',
  'WiFi',
  'GPS',
  'Wodoodporność',
  'Szybkie ładowanie',
  'NFC',
] as const

export const VAT_RATES = [0, 5, 8, 23] as const

export type VatRate = (typeof VAT_RATES)[number]

export const DEFAULT_VAT_RATE: VatRate = 23

export const PAGE_SIZE = 5

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    name: 'MacBook Pro 14"',
    sku: 'MBP14M3PRO',
    description: 'Laptop z procesorem M3 Pro.',
    manufacturer: 'Apple',
    category: 'Komputery',
    features: ['WiFi', 'Bluetooth', 'Szybkie ładowanie'],
    priceNet: 8130.08,
    priceGross: 10000,
    vatRate: DEFAULT_VAT_RATE,
    currency: DEFAULT_CURRENCY,
    available: true,
    limited: false,
    minCartQuantity: 1,
    maxCartQuantity: 3,
  },
  {
    id: 'p-6',
    name: 'MacBook Pro 14"',
    sku: 'MBP14M3PRO',
    description: 'Laptop z procesorem M3 Pro.',
    manufacturer: 'Apple',
    category: 'Komputery',
    features: ['WiFi', 'Bluetooth', 'Szybkie ładowanie'],
    priceNet: 8130.08,
    priceGross: 10000,
    vatRate: DEFAULT_VAT_RATE,
    currency: DEFAULT_CURRENCY,
    available: true,
    limited: false,
    minCartQuantity: 1,
    maxCartQuantity: 3,
  },
  {
    id: 'p-2',
    name: 'Galaxy S24 Ultra',
    sku: 'GALAXYS24ULTRA',
    description: 'Flagowy smartfon Samsunga.',
    manufacturer: 'Samsung',
    category: 'Elektronika',
    features: ['Bluetooth', 'WiFi', 'GPS', 'NFC'],
    priceNet: 4471.54,
    priceGross: 5500,
    vatRate: DEFAULT_VAT_RATE,
    currency: DEFAULT_CURRENCY,
    available: true,
    limited: true,
    stockQuantity: 12,
    minCartQuantity: 1,
    maxCartQuantity: 5,
  },
  {
    id: 'p-3',
    name: 'Sony WH-1000XM5',
    sku: 'SONYWH1000XM5',
    description: 'Słuchawki bezprzewodowe z ANC.',
    manufacturer: 'Sony',
    category: 'Akcesoria',
    features: ['Bluetooth', 'Szybkie ładowanie'],
    priceNet: 1544.72,
    priceGross: 1900,
    vatRate: DEFAULT_VAT_RATE,
    currency: DEFAULT_CURRENCY,
    available: false,
    limited: false,
    minCartQuantity: 1,
    maxCartQuantity: 4,
  },
  {
    id: 'p-4',
    name: 'Bosch Serie 6 WAU28PH1',
    sku: 'BOSCHWAU28PH1',
    description: 'Pralka ładowana od przodu.',
    manufacturer: 'Bosch',
    category: 'AGD',
    features: ['Wodoodporność'],
    priceNet: 2601.63,
    priceGross: 3200,
    vatRate: DEFAULT_VAT_RATE,
    currency: DEFAULT_CURRENCY,
    available: true,
    limited: true,
    stockQuantity: 5,
    minCartQuantity: 1,
    maxCartQuantity: 2,
  },
  {
    id: 'p-5',
    name: 'Xiaomi Smart Band 8',
    sku: 'XIAOMIBAND8',
    description: 'Opaska fitness z GPS.',
    manufacturer: 'Xiaomi',
    category: 'Wearables',
    features: ['Bluetooth', 'GPS', 'Wodoodporność'],
    priceNet: 178.86,
    priceGross: 220,
    vatRate: DEFAULT_VAT_RATE,
    currency: DEFAULT_CURRENCY,
    available: true,
    limited: false,
    minCartQuantity: 1,
    maxCartQuantity: 10,
  },
]
