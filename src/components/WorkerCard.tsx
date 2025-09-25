import { WorkerType } from '@/types/workers'
import Image from 'next/image'

export default function WorkerCard({ worker }: { worker: WorkerType }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="relative w-full h-60 md:h-52 lg:h-60 group overflow-hidden">
        <Image
          src={worker.image || '/placeholder.jpg'}
          alt={worker.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>
      <div className="p-6 flex flex-col justify-between h-48">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 truncate">
            {worker.name}
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base truncate">{worker.service}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="font-semibold text-gray-800 text-sm md:text-base">
            ₹{Math.round(worker.pricePerDay * 1.18)} / day
          </p>
          <span className="px-3 py-1 text-xs md:text-sm font-semibold text-white bg-blue-500 rounded-full shadow-md">
            Available
          </span>
        </div>
      </div>
    </div>
  )
}
