import { z } from 'zod'
import { CURRENCIES } from './types'

const step1Fields = z.object({
  name: z.string().min(3, 'Nazwa produktu musi mieć min. 3 znaki'),
  sku: z
    .string()
    .min(1, 'SKU jest wymagane')
    .max(24, 'SKU może mieć maks. 24 znaki')
    .regex(/^[A-Za-z0-9]+$/, 'SKU może zawierać tylko litery i cyfry'),
  description: z.string().optional(),
  manufacturer: z.string().min(1, 'Wybierz producenta'),
  category: z.string().min(1, 'Wybierz kategorię'),
  features: z.array(z.string()).min(1, 'Wybierz co najmniej jedną cechę'),
})

const step2Fields = z.object({
  priceNet: z.number().positive('Cena netto musi być większa od 0'),
  priceGross: z.number().positive('Cena brutto musi być większa od 0'),
  vatRate: z.number().nonnegative('Wybierz stawkę VAT'),
  currency: z.enum(CURRENCIES),
})

const step3Fields = z.object({
  available: z.boolean(),
  limited: z.boolean(),
  stockQuantity: z.number().int().nonnegative('Ilość nie może być ujemna').optional(),
  minCartQuantity: z.number().int('Min. ilość musi być liczbą całkowitą').positive('Min. ilość musi być większa od 0'),
  maxCartQuantity: z.number().int('Maks. ilość musi być liczbą całkowitą').positive('Maks. ilość musi być większa od 0'),
})

type Step3Fields = z.infer<typeof step3Fields>

function step3Refinements(data: Step3Fields, ctx: z.RefinementCtx) {
  if (data.limited && (data.stockQuantity === undefined || data.stockQuantity === null)) {
    ctx.addIssue({
      code: 'custom',
      path: ['stockQuantity'],
      message: 'Podaj ilość na magazynie',
    })
  }
  if (data.minCartQuantity > data.maxCartQuantity) {
    ctx.addIssue({
      code: 'custom',
      path: ['minCartQuantity'],
      message: 'Min. ilość nie może być większa niż maks.',
    })
    ctx.addIssue({
      code: 'custom',
      path: ['maxCartQuantity'],
      message: 'Maks. ilość nie może być mniejsza niż min.',
    })
  }
}

export const step1Schema = step1Fields
export const step2Schema = step2Fields
export { step3Fields }

export const productSchema = step1Fields
  .extend(step2Fields.shape)
  .extend(step3Fields.shape)
  .superRefine(step3Refinements)

export type Step1Values = z.infer<typeof step1Schema>
export type Step2Values = z.infer<typeof step2Schema>
export type Step3Values = z.infer<typeof step3Fields>
export type ProductFormValues = z.infer<typeof productSchema>
