'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: March 22, 2026</p>

          {/* Content */}
          <div className="space-y-8 text-gray-700">

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                UniKart is a student-centric e-commerce platform designed to facilitate the buying and selling of products and services within a controlled environment. This Privacy Policy outlines how user information is collected, used, and protected within the system.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Collected</h2>
              <p className="leading-relaxed mb-3">UniKart collects the following types of information:</p>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">
                  <span className="font-semibold">Personal Information:</span> Name, email address, phone number, and institutional details during registration.
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">Account Information:</span> Login credentials and user role (Buyer, Seller, Admin).
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">Transaction Data:</span> Order details, booking information, and payment records.
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">Content Data:</span> Product listings, service descriptions, reviews, and uploaded media.
                </li>
                <li className="leading-relaxed">
                  <span className="font-semibold">Report Data:</span> Information related to complaints or reports submitted by users.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Purpose of Data Collection</h2>
              <p className="leading-relaxed mb-3">The collected data is used to:</p>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Provide and manage user accounts.</li>
                <li className="leading-relaxed">Facilitate buying, selling, and booking services.</li>
                <li className="leading-relaxed">Process payments and maintain transaction records.</li>
                <li className="leading-relaxed">Enable communication between users and the system.</li>
                <li className="leading-relaxed">Ensure platform safety through moderation and reporting mechanisms.</li>
                <li className="leading-relaxed">Improve system performance and user experience.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="leading-relaxed mb-3">UniKart implements appropriate security measures to protect user data, including:</p>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Secure authentication using JWT-based mechanisms.</li>
                <li className="leading-relaxed">Role-based access control to restrict unauthorized access.</li>
                <li className="leading-relaxed">Encrypted communication between client and server.</li>
                <li className="leading-relaxed">Controlled database access and monitoring.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-3">UniKart does not sell or share user data with third parties except in the following cases:</p>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">To facilitate payment processing through trusted payment gateways (e.g., Razorpay).</li>
                <li className="leading-relaxed">To comply with legal obligations or institutional policies.</li>
                <li className="leading-relaxed">To prevent fraud, misuse, or security threats.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. User Rights</h2>
              <p className="leading-relaxed mb-3">Users have the right to:</p>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Access and update their personal information.</li>
                <li className="leading-relaxed">Request deletion of their account and associated data.</li>
                <li className="leading-relaxed">Report inappropriate content or users.</li>
                <li className="leading-relaxed">Withdraw from the platform at any time.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Content Moderation and Reporting</h2>
              <p className="leading-relaxed mb-3">
                UniKart uses automated and manual moderation techniques to ensure a safe environment. Reported content is evaluated using a threshold-based system, and necessary actions such as warnings, suspension, or removal are applied accordingly.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="leading-relaxed mb-3">User data is retained only as long as necessary to:</p>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Maintain platform functionality.</li>
                <li className="leading-relaxed">Comply with legal and academic requirements.</li>
                <li className="leading-relaxed">Resolve disputes and enforce policies.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Privacy Policy</h2>
              <p className="leading-relaxed">
                UniKart reserves the right to update this Privacy Policy as required. Users will be notified of significant changes through the platform.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="leading-relaxed">
                For any concerns or queries regarding this Privacy Policy, users may contact the UniKart administration team through the official platform channels.
              </p>
            </section>

            {/* Contact Section */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-indigo-600 font-medium">Email: privacy@unikart.com</p>
                <p className="text-indigo-600 font-medium">Support: support@unikart.com</p>
              </div>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}