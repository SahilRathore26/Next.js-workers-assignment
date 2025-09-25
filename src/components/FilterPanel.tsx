'use client'

import { Dispatch, SetStateAction } from 'react'

interface FilterPanelProps {
  priceFilter: number | ''
  setPriceFilter: Dispatch<SetStateAction<number | ''>>
  serviceFilter: string
  setServiceFilter: Dispatch<SetStateAction<string>>
  services: string[]
}

export default function FilterPanel({
  priceFilter,
  setPriceFilter,
  serviceFilter,
  setServiceFilter,
  services,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 bg-white p-4 rounded-lg shadow-sm">
      {/* Price Filter */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Price/day:</label>
        <input
          type="number"
          value={priceFilter}
          min={0}
          placeholder="Any"
          onChange={(e) =>
            setPriceFilter(e.target.value === '' ? '' : Number(e.target.value))
          }
          className="border border-gray-300 rounded px-3 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Service Filter */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Service:</label>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
