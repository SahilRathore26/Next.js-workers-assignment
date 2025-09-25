import { WorkerType } from '@/types/workers'
import Image from 'next/image'

export default function WorkerCard({ worker }: { worker: WorkerType }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
      {/* Worker Image */}
      <div className="relative w-full h-56 md:h-48 lg:h-56">
        <Image
          src={worker.image || '/placeholder.jpg'}
          alt={worker.name}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>

      {/* Worker Info */}
      <div className="p-4">
        <h2 className="text-lg md:text-xl font-semibold truncate">{worker.name}</h2>
        <p className="text-gray-600 truncate">{worker.service}</p>
        <p className="mt-2 font-medium text-gray-800">
          ₹{Math.round(worker.pricePerDay * 1.18)} / day
        </p>
      </div>
    </div>
  )
}
