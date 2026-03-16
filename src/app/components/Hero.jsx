'use client';

import { Search, Cake, Sparkles, BookOpen, Palette, Laptop, Package, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  { id: "products", name: "Products", icon: Package, emoji: "🛍️", color: "bg-green-100 hover:bg-green-200 text-green-700" },
  { id: "services", name: "Services", icon: Briefcase, emoji: "💼", color: "bg-purple-100 hover:bg-purple-200 text-purple-700" },
  { id: "cakes", name: "Cakes", icon: Cake, emoji: "🧁", color: "bg-pink-100 hover:bg-pink-200 text-pink-700" },
  { id: "jewellery", name: "Jewellery", icon: Sparkles, emoji: "💎", color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700" },
  { id: "tutoring", name: "Tutoring", icon: BookOpen, emoji: "📚", color: "bg-blue-100 hover:bg-blue-200 text-blue-700" },
  { id: "mehendi", name: "Mehendi", icon: Palette, emoji: "🖌️", color: "bg-orange-100 hover:bg-orange-200 text-orange-700" }
];

export default function Hero() {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/shop');
    }
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/shop?category=${categoryId}`);
  };

  return (
    <div className="hero-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Hero Title */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{
            fontFamily: 'Playfair Display, serif',
            color: 'blue',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(99, 102, 241, 0.5)'
          }}>
            Discover Student Businesses<br />
            Right on Campus
          </h1>
          <p className="text-xl md:text-2xl" style={{
            color: 'blue',
            textShadow: '0 1px 10px rgba(0, 0, 0, 0.3)'
          }}>
            From handmade crafts to delicious treats, support your fellow students and shop local
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-12 relative z-10">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search products, services, or shops..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-700 bg-white shadow-sm"
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`category-pill ${category.color}`}
              >
                <span className="text-2xl mr-2">{category.emoji}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}