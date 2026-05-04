"use client";

import { Star, TrendingUp, Award, ShoppingCart } from "lucide-react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addOrIncrementCartItem } from "./utils/storage";

const featuredProducts = [
  { id: 1, name: "Chocolate Truffle Cake", seller: "Sarah's Bakery", price: 450, rating: 4.8, image: "🧁", category: "products" },
  { id: 2, name: "Handmade Scrunchies", seller: "Craft Corner", price: 150, rating: 4.9, image: "✨", category: "products" },
  { id: 3, name: "Math Tutoring", seller: "Priya Tutors", price: 300, rating: 5.0, image: "📚", category: "services" },
  { id: 4, name: "Custom Portraits", seller: "ArtByRaj", price: 800, rating: 4.7, image: "🎨", category: "services" }
];

const topSellers = [
  { name: "Sarah's Bakery", sales: 156, badge: "🥇", rank: 1 },
  { name: "Craft Corner", sales: 142, badge: "🥈", rank: 2 },
  { name: "Priya Tutors", sales: 128, badge: "🥉", rank: 3 }
];

export default function Home() {
  const router = useRouter();
  
  // Add to cart function - prevents duplicates
  const addToCart = (product) => {
    if (typeof window !== 'undefined') {
      const cart = addOrIncrementCartItem(product);
      const item = cart.find((cartItem) => String(cartItem.id) === String(product.id));

      if (item?.quantity > 1) {
        alert(`${product.name} quantity increased to ${item.quantity}!`);
      } else {
        alert(`${product.name} added to cart!`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />

      

      {/* Stats */}
      <section className="py-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div><div className="text-5xl font-bold mb-2">500+</div><div className="text-indigo-200">Active Students</div></div>
            <div><div className="text-5xl font-bold mb-2">150+</div><div className="text-indigo-200">Student Businesses</div></div>
            <div><div className="text-5xl font-bold mb-2">2000+</div><div className="text-indigo-200">Products Sold</div></div>
          </div>
        </div>
      </section>

      {/* Top Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Top Sellers This Month</h2>
            <p className="text-gray-600">Celebrating our most successful student entrepreneurs</p>
          </div>


           {/* <div className="text-center mb-8">
      <button
        onClick={() => router.push("/CreateProduct")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition"
      >
        + Create a Product
      </button>
    </div> */}
     

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topSellers.map(seller => (
              <div key={seller.rank} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{seller.badge}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{seller.name}</h3>
                    <p className="text-gray-600">Rank #{seller.rank}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-indigo-600">
                      <TrendingUp className="w-5 h-5" />
                      <span className="font-bold text-xl">{seller.sales}</span>
                    </div>
                    <p className="text-sm text-gray-500">sales</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/leaderboard">
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
                View Full Leaderboard
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Your Entrepreneurial Journey</h2>
          <p className="text-xl text-gray-600 mb-8">Join hundreds of students who are turning their passions into profit</p>
          <Link href="/sell">
            <button className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
              Become a Seller
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
