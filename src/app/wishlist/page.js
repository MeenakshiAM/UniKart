'use client';

import { useState, useEffect } from "react";
import { Heart, ShoppingCart, Trash2, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ALL PRODUCTS DATA - Same as shop/page.js
const allProducts = [
  { 
    id: 1, 
    name: "Chocolate Truffle Cake", 
    seller: "Sarah's Bakery", 
    price: 450, 
    rating: 4.8, 
    category: "products",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
    inStock: true 
  },
  { 
    id: 2, 
    name: "Red Velvet Cupcakes", 
    seller: "Sarah's Bakery", 
    price: 250, 
    rating: 4.9, 
    category: "products",
    image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
    inStock: true 
  },
  { 
    id: 3, 
    name: "Handmade Scrunchies Set", 
    seller: "Craft Corner", 
    price: 150, 
    rating: 4.9, 
    category: "products",
    image: "https://images.unsplash.com/photo-1630081757603-a46d414be089?w=600&auto=format&fit=crop&q=60",
    inStock: true 
  },
  { 
    id: 4, 
    name: "Handwoven Tote Bag", 
    seller: "Craft Corner", 
    price: 400, 
    rating: 4.8, 
    category: "products",
    image: "https://northhouse.org/images/cache/assets/uploads/course_images/hand-woven-wool-tote-bag_erin-endsley_4_800px_sq-700x700.jpg",
    inStock: true 
  },
  { 
    id: 5, 
    name: "Scented Soy Candles Set", 
    seller: "Aroma Crafts", 
    price: 350, 
    rating: 4.7, 
    category: "products",
    image: "https://pacificnorthwicks.com/cdn/shop/files/Floral_Collection_by_Window.png?v=1728746685&width=1946",
    inStock: true 
  },
  { 
    id: 13, 
    name: "Fresh Rose Bouquet", 
    seller: "Petal Paradise", 
    price: 450, 
    rating: 4.9, 
    category: "products",
    image: "https://flowersugar.com/cdn/shop/files/Little_angel_group_1_table_400x.jpg?v=1712205357",
    inStock: true 
  },
  { 
    id: 17, 
    name: "Handmade Beaded Necklace", 
    seller: "Gem & Bead", 
    price: 320, 
    rating: 4.7, 
    category: "products",
    image: "https://i.etsystatic.com/34927393/r/il/8a6ca9/7216894485/il_fullxfull.7216894485_ljrt.jpg",
    inStock: true 
  },
  { 
    id: 19, 
    name: "Math Tutoring", 
    seller: "Priya Tutors", 
    price: 300, 
    rating: 5.0, 
    category: "services",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7h4UXx4VLjXlkNGzfqnf-fInVKBHY2luvXA&s",
    inStock: true 
  },
  { 
    id: 21, 
    name: "Bridal Mehendi Design", 
    seller: "Mehendi Magic", 
    price: 800, 
    rating: 4.9, 
    category: "services",
    image: "https://i.pinimg.com/736x/72/2c/b1/722cb155f3a04585c746edc82e1c4ddf.jpg",
    inStock: true 
  },
  { 
    id: 23, 
    name: "Saree Draping", 
    seller: "Drape & Style", 
    price: 250, 
    rating: 4.8, 
    category: "services",
    image: "https://images.indianweddingsaree.com/product-image/1961377/1.jpg",
    inStock: true 
  },
  { 
    id: 25, 
    name: "Custom Portrait Art", 
    seller: "ArtByRaj", 
    price: 800, 
    rating: 4.7, 
    category: "services",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
    inStock: false 
  },
  { 
    id: 26, 
    name: "Laptop Repair Service", 
    seller: "TechFix Campus", 
    price: 500, 
    rating: 4.6, 
    category: "services",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    inStock: true 
  }
];

export default function Wishlist() {
  const router = useRouter();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setWishlist(savedWishlist);
      
      // Get full product details for wishlist items
      const products = allProducts.filter(p => savedWishlist.includes(p.id));
      setWishlistProducts(products);
    }
  }, []);

  const removeFromWishlist = (productId) => {
    const newWishlist = wishlist.filter(id => id !== productId);
    setWishlist(newWishlist);
    setWishlistProducts(wishlistProducts.filter(p => p.id !== productId));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const addToCart = (product, e) => {
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        alert(`${product.name} quantity increased to ${cart[existingItemIndex].quantity}!`);
      } else {
        cart.push({ ...product, quantity: 1 });
        alert(`${product.name} added to cart!`);
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('storage'));
    }
  };

  const navigateToProduct = (productId) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
            <p className="text-white/90 text-lg">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Heart className="w-12 h-12 fill-pink-300 text-pink-300" />
        </div>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Your wishlist is empty</h2>
            <p className="text-gray-600 text-lg mb-8">Save items you love for later!</p>
            <button
              onClick={() => router.push('/shop')}
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map(item => {
                const isService = item.category === 'services';
                
                return (
                  <div 
                    key={item.id} 
                    onClick={() => navigateToProduct(item.id)}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
                  >
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(item.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>

                      {/* Category Badge */}
                      <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        isService 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {isService ? '💼 Service' : '🛍️ Product'}
                      </div>

                      {/* Out of Stock Badge */}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">by {item.seller}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        <span className="text-yellow-400">★</span>
                        <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-indigo-600">₹{item.price}</span>
                      </div>

                      {/* Action Button */}
                      {isService ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToProduct(item.id);
                          }}
                          disabled={!item.inStock}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                        >
                          <Calendar className="w-4 h-4" />
                          {item.inStock ? "Book Now" : "Unavailable"}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => addToCart(item, e)}
                          disabled={!item.inStock}
                          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          {item.inStock ? "Add to Cart" : "Unavailable"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explore More Section */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-white mb-6">You might also like</h2>
              <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
                <p className="text-gray-600 text-lg mb-6">Check out similar products from our student sellers</p>
                <button
                  onClick={() => router.push('/shop')}
                  className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-lg"
                >
                  Explore More Products
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}