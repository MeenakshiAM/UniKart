import { Search } from "lucide-react";
import {
  Cake,
  Sparkles,
  BookOpen,
  Palette,
  Laptop,
  Shirt,
} from "lucide-react";

export default function Hero() {
  return (
    <>
    <section
      id="home"
      className="bg-gradient-to-r  from-violet-300 to-violet-500 text-white py-20 px-4"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Discover Student Businesses
          <br />
          Right on Campus
        </h1>

        <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          From handmade crafts to delicious treats, support your fellow students
          and shop local
        </p>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-lg relative w-full sm:flex-1">
            <Search className=" w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, services, or shops..."
              className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button className="w-full sm:w-auto px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
            Search
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            🎂 Cakes
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            ✨ Handmade
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            📚 Tutoring
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            🎨 Art & Crafts
          </span>
          <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
            💻 Tech Services
          </span>
        </div>
      </div>
    </section>



    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Cake className="w-6 h-6 text-purple-600"/>
                </div>
                <div className="text-sm font-medium text-gray-900">Food &amp; Bakes</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover cursor-pointer">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-pink-600"/>
                </div>
                <div className="text-sm font-medium text-gray-900">Handmade</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-blue-600"/>
                </div>
                <div className="text-sm font-medium text-gray-900">Tutoring</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Palette className="w-6 h-6 text-green-600"/>
                </div>
                <div className="text-sm font-medium text-gray-900">Art &amp; Design</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover cursor-pointer">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Laptop className="w-6 h-6 text-indigo-600"/>
                </div>
                <div className="text-sm font-medium text-gray-900">Tech Services</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center card-hover cursor-pointer">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Shirt className="w-6 h-6 text-amber-600"/>
                </div>
                <div className="text-sm font-medium text-gray-900">Fashion</div>
            </div>
        </div>
    </section>

    
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Trending Now</h2>
            <a href="#" className="text-indigo-600 font-medium text-sm hover:text-indigo-700">View All →</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 card-hover cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100"></div>
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">Verified Seller</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Custom Birthday Cake</h3>
                    <p className="text-sm text-gray-600 mb-3">by Sarah's Bakery</p>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">₹450</div>
                        <div className="flex items-center space-x-1">
                            <i data-lucide="star" className="w-4 h-4 text-yellow-400 fill-current"></i>
                            <span className="text-sm font-medium text-gray-700">4.8</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 card-hover cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100"></div>
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Trending</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Handmade Notebook Set</h3>
                    <p className="text-sm text-gray-600 mb-3">by Craft Corner</p>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">₹299</div>
                        <div className="flex items-center space-x-1">
                            <i data-lucide="star" className="w-4 h-4 text-yellow-400 fill-current"></i>
                            <span className="text-sm font-medium text-gray-700">4.9</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 card-hover cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100"></div>
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">Verified Seller</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Math Tutoring (1hr)</h3>
                    <p className="text-sm text-gray-600 mb-3">by Rahul Kumar</p>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">₹200</div>
                        <div className="flex items-center space-x-1">
                            <i data-lucide="star" className="w-4 h-4 text-yellow-400 fill-current"></i>
                            <span className="text-sm font-medium text-gray-700">5.0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 card-hover cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-100"></div>
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Fast Delivery</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Custom Portrait Art</h3>
                    <p className="text-sm text-gray-600 mb-3">by Art Hub</p>
                    <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">₹799</div>
                        <div className="flex items-center space-x-1">
                            <i data-lucide="star" className="w-4 h-4 text-yellow-400 fill-current"></i>
                            <span className="text-sm font-medium text-gray-700">4.7</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}
