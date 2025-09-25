'use client'

import { WorkerType } from '@/types/workers'
import { useState, useEffect, useMemo } from 'react'
import WorkerCard from '@/components/WorkerCard'
import FilterPanel from '@/components/FilterPanel'
import Pagination from '@/components/Pagination'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [priceFilter, setPriceFilter] = useState<number | ''>('') // '' means no filter
  const [serviceFilter, setServiceFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 9

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const res = await fetch('/api/workers')
        const result = await res.json()
        if (!result.success) throw new Error('Failed to fetch')
        setWorkersData(result.data)
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

  // ✅ Fix filters properly
  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((w) => w.pricePerDay > 0 && w.id !== null)
      .filter((w) => (priceFilter !== '' ? w.pricePerDay <= Number(priceFilter) : true))
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
      <div className="p-6 text-center text-gray-700">Loading workers...</div>
    )

  if (error)
    return (
      <div className="p-6 text-center text-red-500">Failed to load workers.</div>
    )

  return (
    <main className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {displayedWorkers.length ? (
          displayedWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No workers match your filters.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
  )}

    </main>
  )
}
