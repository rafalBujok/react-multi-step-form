export function netToGross(net: number, vatRate: number): number {
  return Math.round(net * (1 + vatRate / 100) * 100) / 100
}

export function grossToNet(gross: number, vatRate: number): number {
  return Math.round((gross / (1 + vatRate / 100)) * 100) / 100
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency,
  }).format(amount)
}
