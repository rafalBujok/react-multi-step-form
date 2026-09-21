import type { ProductFormApi } from '@/hooks/use-product-form'
import { FormField } from '@/components/products/form-field'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { step3Fields } from '@/lib/validation'

export function StepAvailability({ form }: { form: ProductFormApi }) {
  return (
    <div className="space-y-4">
      <form.Field name="available">
        {(field) => (
          <div className="flex items-center justify-between rounded-lg border p-3">
            <Label htmlFor={field.name}>Czy produkt jest dostępny</Label>
            <Switch id={field.name} checked={field.state.value} onCheckedChange={field.handleChange} />
          </div>
        )}
      </form.Field>

      <form.Field name="limited">
        {(field) => (
          <div className="flex items-center gap-2">
            <Checkbox
              id={field.name}
              checked={field.state.value}
              onCheckedChange={(checked) => field.handleChange(checked === true)}
            />
            <Label htmlFor={field.name}>Produkt limitowany</Label>
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.limited}>
        {(limited) =>
          limited && (
            <form.Field
              name="stockQuantity"
              validators={{
                onChangeListenTo: ['limited'],
                onChange: ({ value, fieldApi }) => {
                  const limited = fieldApi.form.getFieldValue('limited')
                  if (limited && value === undefined) return 'Podaj ilość na magazynie'
                  if (value === undefined) return undefined
                  const result = step3Fields.shape.stockQuantity.safeParse(value)
                  return result.success ? undefined : result.error.issues[0]?.message
                },
              }}
            >
              {(field) => (
                <FormField label="Ilość na magazynie" htmlFor={field.name} error={field.state.meta.errors[0]}>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    step={1}
                    value={field.state.value ?? ''}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const v = e.target.valueAsNumber
                      field.handleChange(Number.isNaN(v) ? undefined : v)
                    }}
                  />
                </FormField>
              )}
            </form.Field>
          )
        }
      </form.Subscribe>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field
          name="minCartQuantity"
          validators={{
            onChangeListenTo: ['maxCartQuantity'],
            onChange: ({ value, fieldApi }) => {
              const result = step3Fields.shape.minCartQuantity.safeParse(value)
              if (!result.success) return result.error.issues[0]?.message
              const max = fieldApi.form.getFieldValue('maxCartQuantity')
              return value > max ? 'Min. ilość nie może być większa niż maks.' : undefined
            },
          }}
        >
          {(field) => (
            <FormField label="Min. ilość na koszyk" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Input
                id={field.name}
                type="number"
                min={1}
                step={1}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const v = e.target.valueAsNumber
                  field.handleChange(Number.isNaN(v) ? 0 : v)
                }}
              />
            </FormField>
          )}
        </form.Field>

        <form.Field
          name="maxCartQuantity"
          validators={{
            onChangeListenTo: ['minCartQuantity'],
            onChange: ({ value, fieldApi }) => {
              const result = step3Fields.shape.maxCartQuantity.safeParse(value)
              if (!result.success) return result.error.issues[0]?.message
              const min = fieldApi.form.getFieldValue('minCartQuantity')
              return value < min ? 'Maks. ilość nie może być mniejsza niż min.' : undefined
            },
          }}
        >
          {(field) => (
            <FormField label="Maks. ilość na koszyk" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Input
                id={field.name}
                type="number"
                min={1}
                step={1}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const v = e.target.valueAsNumber
                  field.handleChange(Number.isNaN(v) ? 0 : v)
                }}
              />
            </FormField>
          )}
        </form.Field>
      </div>
    </div>
  )
}
