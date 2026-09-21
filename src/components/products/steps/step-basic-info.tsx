import type { ProductFormApi } from '@/hooks/use-product-form'
import { FormField } from '@/components/products/form-field'
import { MultiSelect } from '@/components/products/multi-select'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CATEGORIES, FEATURES, MANUFACTURERS } from '@/lib/mock-data'
import { step1Schema } from '@/lib/validation'
import { zodValueValidator } from '@/lib/form-validators'

export function StepBasicInfo({ form }: { form: ProductFormApi }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field name="name" validators={{ onChange: zodValueValidator(step1Schema.shape.name) }}>
          {(field) => (
            <FormField label="Nazwa produktu" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder='np. MacBook Pro 14"'
              />
            </FormField>
          )}
        </form.Field>

        <form.Field name="sku" validators={{ onChange: zodValueValidator(step1Schema.shape.sku) }}>
          {(field) => (
            <FormField label="SKU produktu" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="np. MBP14M3PRO"
              />
            </FormField>
          )}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <FormField label="Opis" htmlFor={field.name}>
            <Textarea
              id={field.name}
              value={field.state.value ?? ''}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={3}
            />
          </FormField>
        )}
      </form.Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <form.Field name="manufacturer" validators={{ onChange: zodValueValidator(step1Schema.shape.manufacturer) }}>
          {(field) => (
            <FormField label="Producent" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger id={field.name} className="w-full">
                  <SelectValue placeholder="Wybierz producenta" />
                </SelectTrigger>
                <SelectContent>
                  {MANUFACTURERS.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          )}
        </form.Field>

        <form.Field name="category" validators={{ onChange: zodValueValidator(step1Schema.shape.category) }}>
          {(field) => (
            <FormField label="Kategoria" htmlFor={field.name} error={field.state.meta.errors[0]}>
              <Select value={field.state.value} onValueChange={field.handleChange}>
                <SelectTrigger id={field.name} className="w-full">
                  <SelectValue placeholder="Wybierz kategorię" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
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

      <form.Field name="features" validators={{ onChange: zodValueValidator(step1Schema.shape.features) }}>
        {(field) => (
          <FormField label="Cechy produktu" htmlFor={field.name} error={field.state.meta.errors[0]}>
            <MultiSelect id={field.name} options={FEATURES} value={field.state.value} onChange={field.handleChange} />
          </FormField>
        )}
      </form.Field>
    </div>
  )
}
