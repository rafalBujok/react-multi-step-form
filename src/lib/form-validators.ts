import type { ZodType } from 'zod'

export function zodValueValidator(schema: ZodType) {
  return ({ value }: { value: unknown }): string | undefined => {
    const result = schema.safeParse(value)
    return result.success ? undefined : result.error.issues[0]?.message
  }
}
