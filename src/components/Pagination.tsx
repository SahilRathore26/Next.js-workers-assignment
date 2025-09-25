'use client'

import { useMemo } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) {
  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = []
    const maxVisible = 6

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }, [currentPage, totalPages])

  return (
    <div className="flex justify-center mt-6 w-full px-2">
      <div className="flex items-center gap-2 bg-white rounded-2xl shadow-md px-2 py-2 
        overflow-x-auto sm:overflow-visible flex-wrap sm:flex-nowrap">
        
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gray-200 hover:bg-gray-300 
            text-gray-700 text-sm sm:text-base font-semibold transition-transform duration-200 hover:scale-110"
        >
          &larr;
        </button>

        {visiblePages.map((page, index) =>
          page === '...' ? (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 text-gray-400 text-sm sm:text-base font-medium select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => setCurrentPage(Number(page))}
              className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-sm sm:text-base transition-colors duration-200 ${
                page === currentPage
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gray-200 hover:bg-gray-300 
            text-gray-700 text-sm sm:text-base font-semibold transition-transform duration-200 hover:scale-110"
        >
          &rarr;
        </button>
      </div>
    </div>

  )
}
