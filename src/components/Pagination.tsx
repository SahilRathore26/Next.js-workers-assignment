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
    <div className="flex justify-center mt-8">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow px-3 py-2 overflow-x-auto">
        {/* Left Arrow */}
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 font-medium transition-colors"
        >
          &larr;
        </button>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <span key={index}>
            {page === '...' ? (
              <span className="px-3 py-1 text-gray-500 font-medium">...</span>
            ) : (
              <button
                onClick={() => setCurrentPage(Number(page))}
                className={`px-3 py-1 rounded-md font-medium transition-colors duration-200 ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            )}
          </span>
        ))}

        {/* Right Arrow */}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 font-medium transition-colors"
        >
          &rarr;
        </button>
      </div>
    </div>
  )
}
