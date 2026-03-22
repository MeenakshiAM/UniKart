'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Target, Eye, CheckCircle, Zap, TrendingUp, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us – UniKart</h1>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mb-8"></div>

          <div className="space-y-10 text-gray-700">

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="leading-relaxed">
                UniKart is a student-centric e-commerce platform designed to enable seamless buying, selling, and service-based interactions within a college ecosystem. The platform aims to empower student entrepreneurs by providing a secure and structured environment to showcase and monetize their skills, products, and services.
              </p>
            </section>

            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h2>
                  <p className="leading-relaxed">
                    To create a trusted digital marketplace within educational institutions where students can collaborate, trade, and grow through entrepreneurship and service exchange.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">To simplify buying and selling within a closed community.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">To provide opportunities for students to become sellers and service providers.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">To ensure secure and transparent transactions through integrated payment systems.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">To maintain a safe and moderated environment using automated and manual controls.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="leading-relaxed mb-4">
                UniKart provides a hybrid marketplace that supports both <span className="font-semibold">physical products</span> and <span className="font-semibold">service-based offerings</span> such as tutoring, freelancing, and creative services.
              </p>
              <p className="leading-relaxed mb-4 font-semibold">Key features include:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <span className="leading-relaxed">Secure user authentication and role-based access.</span>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <span className="leading-relaxed">Product listing and service booking with slot-based scheduling.</span>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <span className="leading-relaxed">Integrated payment system with escrow-based fund handling.</span>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <span className="leading-relaxed">Review and rating system for transparency.</span>
                </div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg md:col-span-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                  <span className="leading-relaxed">Advanced report and complaint management with threshold-based automation.</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
              <p className="leading-relaxed mb-4">UniKart is built with a focus on:</p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Security</h3>
                    <p className="text-gray-700 leading-relaxed">Ensuring safe transactions and data protection.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Transparency</h3>
                    <p className="text-gray-700 leading-relaxed">Clear workflows for payments, orders, and dispute resolution.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Scalability</h3>
                    <p className="text-gray-700 leading-relaxed">Designed with modular architecture to support future growth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">User Experience</h3>
                    <p className="text-gray-700 leading-relaxed">Simple and intuitive interface for all types of users.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Future Scope</h2>
              <p className="leading-relaxed mb-4">UniKart aims to evolve with advanced features such as:</p>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">AI-based product recommendations.</li>
                <li className="leading-relaxed">Enhanced content moderation using image and text analysis.</li>
                <li className="leading-relaxed">Real-time communication between buyers and sellers.</li>
                <li className="leading-relaxed">Expansion beyond a single institution to a broader network.</li>
              </ul>
            </section>

            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
              <p className="leading-relaxed text-lg">
                UniKart is more than just a marketplace—it is a platform that encourages innovation, entrepreneurship, and collaboration among students, providing them with real-world exposure to digital commerce systems.
              </p>
            </section>

            <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-4">Join the UniKart Community</h3>
              <p className="mb-6 text-lg">Start your entrepreneurial journey today!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Browse Products
                </Link>
                <Link
                  href="/sell"
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition-colors"
                >
                  Start Selling
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}