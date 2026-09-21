import { useState } from 'react'
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { StepIndicator } from '@/components/products/step-indicator'
import { StepBasicInfo } from '@/components/products/steps/step-basic-info'
import { StepPricing } from '@/components/products/steps/step-pricing'
import { StepAvailability } from '@/components/products/steps/step-availability'
import { useProductForm } from '@/hooks/use-product-form'
import { step1Schema, step2Schema, productSchema, type ProductFormValues } from '@/lib/validation'

interface AddProductDialogProps {
  onAddProduct: (values: ProductFormValues) => void
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2 | 3>(1)

  const form = useProductForm((values) => {
    onAddProduct(values)
    handleOpenChange(false)
    toast.success('Produkt został dodany')
  })

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen) {
      setStep(1)
      form.reset()
    }
  }

  async function handleNext() {
    await form.validateAllFields('change')
    if (step === 1) {
      const result = step1Schema.safeParse(form.state.values)
      if (result.success) setStep(2)
    } else if (step === 2) {
      const result = step2Schema.safeParse(form.state.values)
      if (result.success) setStep(3)
    }
  }

  async function handleSubmit() {
    await form.validateAllFields('change')
    const result = productSchema.safeParse(form.state.values)
    if (!result.success) return
    await form.handleSubmit()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-auto px-4 py-2">
          <Plus />
          Dodaj produkt
        </Button>
      </DialogTrigger>
      <DialogContent
        className="!top-0 !left-0 !flex !h-full !w-full !max-w-full !translate-x-0 !translate-y-0 !flex-col overflow-hidden !rounded-none min-[720px]:!top-1/2 min-[720px]:!left-1/2 min-[720px]:!h-auto min-[720px]:!max-h-[90vh] min-[720px]:!w-[720px] min-[720px]:!max-w-[720px] min-[720px]:!translate-x-[-50%] min-[720px]:!translate-y-[-50%] min-[720px]:!rounded-xl"
      >
        <DialogHeader className="shrink-0">
          <DialogTitle>Dodaj nowy produkt</DialogTitle>
        </DialogHeader>

        <div className="shrink-0">
          <Separator className="min-[720px]:!w-auto min-[720px]:-mx-4" />
          <div className="py-4">
            <StepIndicator currentStep={step} />
          </div>
          <Separator className="min-[720px]:!w-auto min-[720px]:-mx-4" />
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overflow-x-hidden px-1 -mx-1">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            {step === 1 && <StepBasicInfo form={form} />}
            {step === 2 && <StepPricing form={form} />}
            {step === 3 && <StepAvailability form={form} />}
          </form>
        </div>

        <DialogFooter className="shrink-0 flex-row justify-between sm:justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              className="h-auto px-4 py-2"
              onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
            >
              <ArrowLeft />
              Wstecz
            </Button>
          ) : (
            <span aria-hidden />
          )}
          {step < 3 ? (
            <Button className="h-auto px-4 py-2" onClick={handleNext}>
              Dalej
              <ArrowRight />
            </Button>
          ) : (
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  Zapisz produkt
                </Button>
              )}
            </form.Subscribe>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
