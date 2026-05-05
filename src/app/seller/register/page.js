'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Package, Store } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SellerRegister() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    // User details (auto-filled)
    name: '',
    email: '',
    registerNumber: '',
    dateOfBirth: '',
    department: '',
    
    // Seller-specific details
    shopName: '',
    itemName: '',
    itemDescription: '',
    itemImage: '',
    itemCategory: 'ELECTRONICS',
    itemSubCategory: '',
    itemPrice: '',
    itemQuantity: '1'
  });
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please login first to become a seller');
      router.push('/');
      return;
    }

    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      
      // Auto-fill user details
      setFormData(prev => ({
        ...prev,
        name: parsedData.name || '',
        email: parsedData.email || '',
        registerNumber: parsedData.registerNumber || '',
        dateOfBirth: parsedData.dateOfBirth || '',
        department: parsedData.department || ''
      }));
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    if (!formData.shopName || !formData.itemName || !formData.itemDescription || !formData.itemPrice) {
      alert('Please fill all seller details');
      return;
    }

    // Create seller account locally first
    const sellerData = {
      ...formData,
      sellerId: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    // Save seller data to localStorage
    const existingSellers = JSON.parse(localStorage.getItem('sellers') || '[]');
    existingSellers.push(sellerData);
    localStorage.setItem('sellers', JSON.stringify(existingSellers));

    // Update user type to seller
    localStorage.setItem('userType', 'seller');
    localStorage.setItem('isSeller', 'true');

    // Prepare FormData for backend API
    const productFormData = new FormData();
    productFormData.append('title', formData.itemName);
    productFormData.append('description', formData.itemDescription);
    productFormData.append('type', 'PRODUCT');
    productFormData.append('category', formData.itemCategory);
    productFormData.append('subCategory', formData.itemSubCategory || '');
    productFormData.append('basePrice', formData.itemPrice);
    productFormData.append('quantity', formData.itemQuantity);
    
    // Get userId from localStorage or use temp
    const userId = localStorage.getItem('userId') || '6972258513eaa7bf3d93d551';
    productFormData.append('userId', userId);

    // Append images
    images.forEach((img) => productFormData.append('images', img));

    try {
      // Send to backend API
      const res = await fetch('http://localhost:4002/api/products/create', {
        method: 'POST',
        body: productFormData,
      });

      const data = await res.json();
      console.log('Backend Response:', data);

      if (res.ok) {
        // Also save to localStorage for frontend display
        const firstProduct = {
          id: data.product?._id || Date.now(),
          name: formData.itemName,
          description: formData.itemDescription,
          price: parseFloat(formData.itemPrice),
          category: formData.itemCategory.toLowerCase(),
          subCategory: formData.itemSubCategory,
          image: data.product?.images?.[0] || formData.itemImage || '📦',
          seller: formData.name,
          shopName: formData.shopName,
          inStock: true,
          quantity: parseInt(formData.itemQuantity),
          rating: 0,
          totalReviews: 0,
          reviews: [],
          createdAt: new Date().toISOString()
        };

        // Add to seller products
        const sellerProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
        sellerProducts.push(firstProduct);
        localStorage.setItem('sellerProducts', JSON.stringify(sellerProducts));

        alert('✅ Seller account and product created successfully!');
        //router.push('/seller');
      } else {
        alert(`❌ Error: ${data.message || 'Failed to create product. Check console.'}`);
        console.error('Error:', data);
      }
    } catch (err) {
      console.error('Network error:', err);
      
      // Fallback: Save locally if backend fails
      const firstProduct = {
        id: Date.now(),
        name: formData.itemName,
        description: formData.itemDescription,
        price: parseFloat(formData.itemPrice),
        category: formData.itemCategory.toLowerCase(),
        subCategory: formData.itemSubCategory,
        image: formData.itemImage || '📦',
        seller: formData.name,
        shopName: formData.shopName,
        inStock: true,
        quantity: parseInt(formData.itemQuantity),
        rating: 0,
        totalReviews: 0,
        reviews: [],
        createdAt: new Date().toISOString()
      };

      const sellerProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
      sellerProducts.push(firstProduct);
      localStorage.setItem('sellerProducts', JSON.stringify(sellerProducts));

      alert('⚠️ Backend unavailable. Product saved locally. Seller account created!');
      router.push('/seller');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-white/80 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Seller Account</h1>
            <p className="text-gray-600">Turn your passion into profit. Join hundreds of student entrepreneurs.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* User Information Section (Auto-filled, Read-only) */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-indigo-600" />
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black caret-black"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black caret-black"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Register Number</label>
                  <input
                    type="text"
                    name="registerNumber"
                    value={formData.registerNumber}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black caret-black"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-black caret-black"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Seller Information Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Store className="w-6 h-6 text-purple-600" />
                Seller Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shop Name *
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    value={formData.shopName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black caret-black"
                    placeholder="e.g., Sarah's Sweet Treats, Tech Hub, Art Corner"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">This will be displayed on all your products</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* First Product/Service Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6 text-green-600" />
                Your First Product
              </h2>
              
              <div className="space-y-4">
                
                {/* Item Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="itemCategory"
                    value={formData.itemCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black caret-black"
                    required
                  >
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="BOOKS">Books</option>
                    <option value="FURNITURE">Furniture</option>
                    <option value="CLOTHING">Clothing</option>
                    <option value="FOOD">Food</option>
                    <option value="SPORTS">Sports</option>
                    <option value="BEAUTY">Beauty</option>
                    <option value="TOYS">Toys</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                {/* SubCategory */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SubCategory (Optional)
                  </label>
                  <input
                    type="text"
                    name="itemSubCategory"
                    value={formData.itemSubCategory}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black caret-black"
                    placeholder="e.g., Laptops, Notebooks, T-Shirts"
                  />
                </div>

                {/* Item Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black caret-black"
                    placeholder="e.g., Chocolate Truffle Cake, MacBook Pro, Custom Artwork"
                    required
                  />
                </div>

                {/* Item Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="itemDescription"
                    value={formData.itemDescription}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-black caret-black"
                    placeholder="Describe your product in detail..."
                    required
                  />
                </div>

                {/* Price and Quantity Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Base Price (₹) *
                    </label>
                    <input
                      type="number"
                      name="itemPrice"
                      value={formData.itemPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black caret-black"
                      placeholder="450"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="itemQuantity"
                      value={formData.itemQuantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black caret-black"
                      placeholder="1"
                      min="1"
                      required
                    />
                  </div>
                </div>

                {/* Product Images Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Images
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">Choose Images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {images.length > 0 && (
                      <span className="text-sm text-gray-600">
                        {images.length} image(s) selected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload product images (optional). These files will be sent with your product data to the same product creation API.
                  </p>
                </div>

                {/* Item Image URL (fallback) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Or Paste Image URL / Emoji
                  </label>
                  <input
                    type="text"
                    name="itemImage"
                    value={formData.itemImage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-black caret-black"
                    placeholder="https://example.com/image.jpg or 🎂"
                  />
                </div>

              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
              >
                Create Seller Account & Product
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
