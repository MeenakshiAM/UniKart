import {Linkedin,Instagram,Twitter} from "lucide-react";

export default function Footer() {
 return (
    <>
    <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div className="font-bold text-xl text-white mb-4 tracking-tight">UniKart</div>
                    <p className="text-sm text-gray-400">Empowering student entrepreneurs to build and grow their businesses on campus.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4 text-sm">For Buyers</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#home" className="hover:text-white transition-colors">Browse Products</a></li>
                        <li><a href="buyer.html" className="hover:text-white transition-colors">Track Orders</a></li>
                        <li><a href="Leadership.html" className="hover:text-white transition-colors">Leaderboard</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4 text-sm">For Sellers</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="Seller.html" className="hover:text-white transition-colors">Start Selling</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Seller Guide</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Fee Structure</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-500">© 2026 UniKart. All rights reserved.</div>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">
                        <Instagram className="w-5 h-5"/>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">
                        <Twitter className="w-5 h-5"/>
                    </a>
                    <a href="#" className="text-gray-500 hover:text-white transition-colors">
                        <Linkedin className="w-5 h-5"/>
                    </a>
                </div>
            </div>
        </div>
    </footer>
    </>
 );
}