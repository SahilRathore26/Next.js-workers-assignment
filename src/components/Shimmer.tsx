export default function Shimmer() {
  return (
    <div className="w-full h-64 bg-gray-200 relative overflow-hidden rounded-lg">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    </div>
  )
}
