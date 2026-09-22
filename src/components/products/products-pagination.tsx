import { cn } from '@/lib/utils'
import { useProductsPage } from '@/hooks/use-products-page'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface ProductsPaginationProps {
  totalPages: number;
  totalProducts:number;
}

export function ProductsPagination({ totalPages, totalProducts }: ProductsPaginationProps) {
  const [page, setPage] = useProductsPage()
  const currentPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1))

  if (totalPages <= 1) return null

  return (
    <Pagination className="mt-4 flex-col items-center gap-2 sm:mt-0 sm:flex-row sm:justify-between sm:gap-0 sm:rounded-b-xl sm:border-x sm:border-t sm:border-b sm:bg-muted/30 sm:px-4 sm:py-3">
      <span className="text-xs text-muted-foreground">
        Strona {currentPage} z {totalPages} · {totalProducts} produktów
      </span>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="Wstecz"
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : undefined}
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) setPage(currentPage - 1)
            }}
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === currentPage}
              className={cn(
                'rounded-[8px]',
                p === currentPage && 'border-blue-600 bg-blue-600 text-white hover:bg-blue-600 hover:text-white',
              )}
              onClick={(e) => {
                e.preventDefault()
                setPage(p)
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href="#"
            text="Dalej"
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : undefined}
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) setPage(currentPage + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
