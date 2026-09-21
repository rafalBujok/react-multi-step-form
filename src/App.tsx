import { useState } from 'react'
import { AddProductDialog } from '@/components/products/add-product-dialog'
import { ProductsPagination, useProductsPage } from '@/components/products/products-pagination'
import { ProductsTable } from '@/components/products/products-table'
import { Toaster } from '@/components/ui/sonner'
import { INITIAL_PRODUCTS, PAGE_SIZE } from '@/lib/mock-data'
import type { Product } from '@/lib/types'
import type { ProductFormValues } from '@/lib/validation'

function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS)
  const [page, setPage] = useProductsPage()

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE))
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const paginatedProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleAddProduct(values: ProductFormValues) {
    const newProduct: Product = { id: crypto.randomUUID(), ...values }
    setProducts((prev) => [newProduct, ...prev])
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Produkty</h1>
          <p className="text-sm text-muted-foreground">{products.length} produktów w katalogu</p>
        </div>
        <AddProductDialog onAddProduct={handleAddProduct} />
      </div>

      <ProductsTable products={paginatedProducts} />
      <ProductsPagination totalPages={totalPages} totalProducts={products.length} />

      <Toaster />
    </div>
  )
}

export default App
