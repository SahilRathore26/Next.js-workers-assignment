'use client'

import { WorkerType } from '@/types/workers'
import { useState, useEffect, useMemo } from 'react'
import WorkerCard from '@/components/WorkerCard'
import FilterPanel from '@/components/FilterPanel'
import Pagination from '@/components/Pagination'
import Shimmer from '@/components/Shimmer'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [priceFilter, setPriceFilter] = useState<number | ''>('')
  const [serviceFilter, setServiceFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await fetch('/api/workers')
        const result = await res.json()
        if (!result.success) throw new Error('Failed to fetch')

        // ✅ Ensure pricePerDay is a number
        const normalizedData = result.data.map((w: any) => ({
          ...w,
          pricePerDay: Number(w.pricePerDay) || 0,
        }))

        setWorkersData(normalizedData)
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchWorkers()
  }, [])

  const services = useMemo(() => {
    return Array.from(new Set(workersData.map((w) => w.service)))
  }, [workersData])

  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((w) => w.id !== null && w.pricePerDay > 0)
      // ✅ Correct price filter
      .filter((w) => (priceFilter !== '' ? w.pricePerDay <= priceFilter : true))
      .filter((w) => (serviceFilter ? w.service === serviceFilter : true))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, priceFilter, serviceFilter])

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage)
  const displayedWorkers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredWorkers.slice(start, start + itemsPerPage)
  }, [filteredWorkers, currentPage])

  if (loading)
    return (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <Shimmer key={index} />
        ))}
      </div>
    )

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
        Failed to load workers.
      </div>
    )

  return (
    <main className="w-full min-h-screen bg-gray-50 px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
        Our Workers
      </h1>

      {/* Filter Panel */}
      <FilterPanel
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        services={services}
      />

      {/* Worker Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {displayedWorkers.length ? (
          displayedWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full text-lg mt-12">
            No workers match your filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center overflow-x-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </main>
  )
}
