import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency } from '@/lib/price'
import type { Product } from '@/lib/types'

interface ProductsTableProps {
  products: Product[]
}

function AvailabilityBadge({ available }: { available: boolean }) {
  return available ? (
    <Badge className="bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400">Dostępny</Badge>
  ) : (
    <Badge variant="destructive">Niedostępny</Badge>
  )
}

function stockLabel(product: Product) {
  return product.limited ? product.stockQuantity : '—'
}

export function ProductsTable({ products }: ProductsTableProps) {
  if (products.length === 0) {
    return <p className="rounded-xl border p-6 text-center text-sm text-muted-foreground">Brak produktów</p>
  }

  return (
    <>
      <div className="grid gap-3 sm:hidden">
        {products.map((product) => (
          <Card key={product.id} size="sm" className="h-[142px] overflow-hidden">
            <CardContent className="flex h-full flex-col justify-between gap-2">
              <div className="flex items-start justify-between gap-2">
                <span className="min-w-0 flex-1 truncate font-medium">{product.name}</span>
                <AvailabilityBadge available={product.available} />
              </div>
              <p className="truncate text-sm text-muted-foreground">{product.sku}</p>
              <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted p-2">
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">Kategoria</p>
                  <p className="truncate text-sm font-medium">{product.category}</p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">Cena brutto</p>
                  <p className="truncate text-sm font-medium">{formatCurrency(product.priceGross, product.currency)}</p>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs text-muted-foreground">Magazyn</p>
                  <p className="truncate text-sm font-medium">{stockLabel(product)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="hidden rounded-t-xl border-x border-t sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Nazwa</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Kategoria</TableHead>
              <TableHead>Cena brutto</TableHead>
              <TableHead>Dostępność</TableHead>
              <TableHead>Magazyn</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="pl-4 font-medium">{product.name}</TableCell>
                <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{formatCurrency(product.priceGross, product.currency)}</TableCell>
                <TableCell>
                  <AvailabilityBadge available={product.available} />
                </TableCell>
                <TableCell>{stockLabel(product)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
