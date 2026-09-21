import type { FocusEvent } from 'react'
import type { ProductFormApi } from '@/hooks/use-product-form'
import { FormField } from '@/components/products/form-field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CURRENCIES, VAT_RATES } from '@/lib/mock-data'
import { grossToNet, netToGross } from '@/lib/price'
import { step2Schema } from '@/lib/validation'
import { zodValueValidator } from '@/lib/form-validators'

function selectOnFocus(e: FocusEvent<HTMLInputElement>) {
  e.target.select()
}

export function StepPricing({ form }: { form: ProductFormApi }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field name="priceNet" validators={{ onChange: zodValueValidator(step2Schema.shape.priceNet) }}>
          {(field) => (
            <FormField label="Cena netto" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Input
                id={field.name}
                type="number"
                step="0.01"
                value={field.state.value}
                onFocus={selectOnFocus}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const net = e.target.valueAsNumber
                  const safeNet = Number.isNaN(net) ? 0 : net
                  field.handleChange(safeNet)
                  const vatRate = form.getFieldValue('vatRate')
                  form.setFieldValue('priceGross', netToGross(safeNet, vatRate))
                }}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field name="priceGross" validators={{ onChange: zodValueValidator(step2Schema.shape.priceGross) }}>
          {(field) => (
            <FormField label="Cena brutto" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Input
                id={field.name}
                type="number"
                step="0.01"
                value={field.state.value}
                onFocus={selectOnFocus}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const gross = e.target.valueAsNumber
                  const safeGross = Number.isNaN(gross) ? 0 : gross
                  field.handleChange(safeGross)
                  const vatRate = form.getFieldValue('vatRate')
                  form.setFieldValue('priceNet', grossToNet(safeGross, vatRate))
                }}
              />
            </FormField>
          )}
        </form.Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field name="vatRate" validators={{ onChange: zodValueValidator(step2Schema.shape.vatRate) }}>
          {(field) => (
            <FormField label="Stawka VAT" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Select
                value={String(field.state.value)}
                onValueChange={(v) => {
                  const vatRate = Number(v)
                  field.handleChange(vatRate)
                  const net = form.getFieldValue('priceNet')
                  form.setFieldValue('priceGross', netToGross(net, vatRate))
                }}
              >
                <SelectTrigger id={field.name} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {VAT_RATES.map((rate) => (
                    <SelectItem key={rate} value={String(rate)}>
                      {rate}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}
        </form.Field>

        <form.Field name="currency" validators={{ onChange: zodValueValidator(step2Schema.shape.currency) }}>
          {(field) => (
            <FormField label="Waluta" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value as typeof field.state.value)}
              >
                <SelectTrigger id={field.name} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}
        </form.Field>
      </div>
    </div>
  )
}
