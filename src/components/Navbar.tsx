import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          WorkerHub
        </Link>

        {/* Menu */}
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/workers" className="hover:text-gray-300">
            Workers
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}