import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { step: 1, label: 'Informacje', subtitle: 'Dane podstawowe' },
  { step: 2, label: 'Cena', subtitle: 'Dane cenowe' },
  { step: 3, label: 'Dostępność', subtitle: 'Stany magazynowe' },
] as const

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center">
      {STEPS.map((s, index) => {
        const isCompleted = s.step < currentStep
        const isActive = s.step === currentStep
        return (
          <div key={s.step} className="flex flex-1 items-center last:flex-none">
            <div className="flex min-w-0 flex-col items-center gap-1 min-[720px]:flex-row min-[720px]:gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium',
                  (isActive || isCompleted) && 'border-primary bg-primary text-primary-foreground',
                  !isActive && !isCompleted && 'border-muted-foreground/30 text-muted-foreground',
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : s.step}
              </div>
              <div className="flex min-w-0 flex-col items-center min-[720px]:items-start">
                <span
                  className={cn(
                    'truncate text-xs font-medium min-[720px]:text-sm',
                    isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {s.label}
                </span>
                <span className="truncate text-[10px] text-muted-foreground min-[720px]:text-xs">
                  {s.subtitle}
                </span>
              </div>
            </div>
            {index < STEPS.length - 1 && (
              <div className={cn('mx-2 h-px flex-1', isCompleted ? 'bg-primary' : 'bg-border')} />
            )}
          </div>
        )
      })}
    </div>
  )
}
