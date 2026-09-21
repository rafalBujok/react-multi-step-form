import { useForm } from '@tanstack/react-form'
import { DEFAULT_CURRENCY, DEFAULT_VAT_RATE } from '@/lib/mock-data'
import type { ProductFormValues } from '@/lib/validation'

export const DEFAULT_PRODUCT_FORM_VALUES: ProductFormValues = {
  name: '',
  sku: '',
  description: '',
  manufacturer: '',
  category: '',
  features: [],
  priceNet: 0,
  priceGross: 0,
  vatRate: DEFAULT_VAT_RATE,
  currency: DEFAULT_CURRENCY,
  available: true,
  limited: false,
  stockQuantity: undefined,
  minCartQuantity: 1,
  maxCartQuantity: 1,
}

export function useProductForm(onSubmit: (values: ProductFormValues) => void) {
  return useForm({
    defaultValues: DEFAULT_PRODUCT_FORM_VALUES,
    onSubmit: async ({ value }) => {
      onSubmit(value)
    },
  })
}

export type ProductFormApi = ReturnType<typeof useProductForm>
