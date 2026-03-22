'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          
          {/* Header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: March 22, 2026</p>

          {/* Content */}
          <div className="space-y-8 text-gray-700">

            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Welcome to UniKart. By accessing or using the platform, users agree to comply with and be bound by the following terms and conditions. These terms govern the use of the system for buying, selling, and service-based interactions.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Eligibility</h2>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Users must be part of the authorized institutional community to access UniKart.</li>
                <li className="leading-relaxed">Users are responsible for providing accurate and valid information during registration.</li>
                <li className="leading-relaxed">Each user is allowed to maintain only one active account.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Roles and Responsibilities</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Buyer</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="leading-relaxed">Can browse products and services, place orders, and make payments.</li>
                    <li className="leading-relaxed">Must ensure accurate order details and timely communication with sellers.</li>
                    <li className="leading-relaxed">Responsible for verifying delivery using OTP before confirming completion.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Seller</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="leading-relaxed">Responsible for listing genuine products and services.</li>
                    <li className="leading-relaxed">Must provide accurate descriptions, pricing, and availability details.</li>
                    <li className="leading-relaxed">Obligated to fulfill orders and services as agreed.</li>
                    <li className="leading-relaxed">Subject to moderation and approval by the platform.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Admin</h3>
                  <ul className="space-y-2 ml-6">
                    <li className="leading-relaxed">Has authority to monitor platform activities.</li>
                    <li className="leading-relaxed">Can approve/reject sellers, moderate content, and resolve disputes.</li>
                    <li className="leading-relaxed">Ensures smooth functioning and safety of the platform.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Product and Service Listings</h2>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">All listings must comply with platform guidelines and institutional standards.</li>
                <li className="leading-relaxed">Misleading, offensive, or prohibited content is not allowed.</li>
                <li className="leading-relaxed">UniKart reserves the right to remove or hide listings that violate policies.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payments and Transactions</h2>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">All payments are processed through integrated payment gateways (e.g., Razorpay).</li>
                <li className="leading-relaxed">Funds are temporarily held in a secure escrow system until order completion.</li>
                <li className="leading-relaxed">Payment confirmation is required before order or booking is finalized.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Order and Booking Completion</h2>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Orders are considered complete only after OTP verification.</li>
                <li className="leading-relaxed">For services, bookings are confirmed upon successful payment.</li>
                <li className="leading-relaxed">Sellers receive payment only after successful completion of the transaction.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cancellation and Refund Policy</h2>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Users may request cancellation before order/service completion.</li>
                <li className="leading-relaxed">Refunds are processed based on platform policies and verification.</li>
                <li className="leading-relaxed">In case of disputes, the admin's decision is final.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Reporting and Misuse</h2>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">Users can report products, reviews, sellers, or other users.</li>
                <li className="leading-relaxed">UniKart uses a threshold-based system to take actions such as warnings, suspensions, or bans.</li>
                <li className="leading-relaxed">False or malicious reporting may result in penalties.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Account Suspension and Termination</h2>
              <p className="leading-relaxed mb-3">
                UniKart reserves the right to suspend or terminate accounts involved in:
              </p>
              <ul className="space-y-2 ml-6 mb-3">
                <li className="leading-relaxed">Fraudulent activities</li>
                <li className="leading-relaxed">Policy violations</li>
                <li className="leading-relaxed">Repeated complaints or misuse</li>
              </ul>
              <p className="leading-relaxed">
                Permanent bans may be applied in severe cases.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
              <ul className="space-y-2 ml-6">
                <li className="leading-relaxed">UniKart acts as an intermediary platform and is not directly responsible for the quality of products or services.</li>
                <li className="leading-relaxed">However, the platform ensures moderation and dispute resolution mechanisms.</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="leading-relaxed">
                UniKart reserves the right to update these Terms and Conditions at any time. Continued use of the platform constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Rules</h2>
              <p className="leading-relaxed">
                These terms are governed by institutional policies and applicable regulations. Any disputes will be handled under the platform's administrative authority.
              </p>
            </section>

            {/* Contact Section */}
            <section className="border-t border-gray-200 pt-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="mt-3 text-indigo-600 font-medium">support@unikart.com</p>
            </section>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}