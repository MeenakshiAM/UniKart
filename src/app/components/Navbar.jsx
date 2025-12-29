import { ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Left */}
          <div className="flex items-center space-x-8">
            <div className="font-bold text-xl tracking-tight gradient-text">
              UniKart
            </div>

            <div className="hidden md:flex space-x-6">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/shop" className="nav-link">Shop</Link>
              <Link href="/sell" className="nav-link">Sell</Link>
              <Link href="/leaderboard" className="nav-link">Leaderboard</Link>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <button className="icon-btn">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>

            <button className="icon-btn">
              <Heart className="w-5 h-5 text-gray-700" />
            </button>

            <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Sign In
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
