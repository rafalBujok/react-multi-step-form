import { cn } from '@/lib/utils'

interface MultiSelectProps {
  id?: string
  options: readonly string[]
  value: string[]
  onChange: (next: string[]) => void
}

export function MultiSelect({ id, options, value, onChange }: MultiSelectProps) {
  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option))
    } else {
      onChange([...value, option])
    }
  }

  return (
    <div id={id} className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value.includes(option)
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(option)}
            className={cn(
              'rounded-full border px-3 py-1 text-sm transition-colors',
              selected
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground',
            )}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}
