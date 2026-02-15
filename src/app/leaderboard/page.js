'use client';

import { useState } from "react";
import { Trophy, TrendingUp, Award, Flame } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const leaderboardData = [
  { rank: 1, name: "Sarah's Bakery", avatar: "🧁", sales: 156, revenue: 67500, streak: 28, badge: "🏆 Top Seller", level: 5, category: "Cakes" },
  { rank: 2, name: "Craft Corner", avatar: "✨", sales: 142, revenue: 58200, streak: 24, badge: "⭐ Rising Star", level: 4, category: "Handmade" },
  { rank: 3, name: "Priya Tutors", avatar: "📚", sales: 128, revenue: 52000, streak: 21, badge: "🎓 Expert", level: 4, category: "Tutoring" },
  { rank: 4, name: "ArtByRaj", avatar: "🎨", sales: 115, revenue: 48500, streak: 19, badge: "🎨 Creative Pro", level: 4, category: "Art & Crafts" },
  { rank: 5, name: "TechFix Campus", avatar: "💻", sales: 98, revenue: 42000, streak: 15, badge: "⚡ Tech Wizard", level: 3, category: "Tech Services" },
  { rank: 6, name: "Mehendi Magic", avatar: "🖌️", sales: 87, revenue: 35400, streak: 12, badge: "✨ Trending", level: 3, category: "Art & Crafts" },
  { rank: 7, name: "Code Tutors", avatar: "👨‍💻", sales: 76, revenue: 31800, streak: 10, badge: "💪 Consistent", level: 3, category: "Tutoring" },
  { rank: 8, name: "Fitness Coach Sam", avatar: "💪", sales: 64, revenue: 27500, streak: 8, badge: "🔥 Hot Streak", level: 2, category: "Services" }
];

const achievements = [
  { icon: "🏆", name: "Top Seller", desc: "Rank #1 for 30 days" },
  { icon: "🔥", name: "Hot Streak", desc: "50+ consecutive days active" },
  { icon: "⭐", name: "5-Star Pro", desc: "Maintain 4.9+ rating" },
  { icon: "💎", name: "Premium", desc: "₹1L+ in revenue" }
];

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState("month");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Leaderboard</h1>
            <p className="text-xl text-indigo-100">
              Celebrating our top student entrepreneurs
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Timeframe Selector */}
        <div className="flex justify-center gap-3 mb-8">
          {["week", "month", "year", "all-time"].map(period => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                timeframe === period
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              
              {/* Top 3 Podium */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
                <div className="grid grid-cols-3 gap-4 items-end">
                  
                  {/* Rank 2 */}
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-3 border-4 border-gray-300">
                      {leaderboardData[1].avatar}
                    </div>
                    <div className="text-5xl mb-2">🥈</div>
                    <h3 className="font-bold text-gray-900">{leaderboardData[1].name}</h3>
                    <p className="text-sm text-gray-600">{leaderboardData[1].sales} sales</p>
                    <div className="mt-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium inline-block">
                      Level {leaderboardData[1].level}
                    </div>
                  </div>

                  {/* Rank 1 */}
                  <div className="text-center -mt-6">
                    <div className="w-24 h-24 mx-auto bg-yellow-200 rounded-full flex items-center justify-center text-5xl mb-3 border-4 border-yellow-400 shadow-lg">
                      {leaderboardData[0].avatar}
                    </div>
                    <div className="text-6xl mb-2">👑</div>
                    <h3 className="font-bold text-lg text-gray-900">{leaderboardData[0].name}</h3>
                    <p className="text-sm text-gray-600">{leaderboardData[0].sales} sales</p>
                    <div className="mt-2 px-3 py-1 bg-yellow-100 rounded-full text-xs font-medium text-yellow-800 inline-block">
                      Level {leaderboardData[0].level}
                    </div>
                  </div>

                  {/* Rank 3 */}
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-orange-200 rounded-full flex items-center justify-center text-4xl mb-3 border-4 border-orange-300">
                      {leaderboardData[2].avatar}
                    </div>
                    <div className="text-5xl mb-2">🥉</div>
                    <h3 className="font-bold text-gray-900">{leaderboardData[2].name}</h3>
                    <p className="text-sm text-gray-600">{leaderboardData[2].sales} sales</p>
                    <div className="mt-2 px-3 py-1 bg-orange-100 rounded-full text-xs font-medium inline-block">
                      Level {leaderboardData[2].level}
                    </div>
                  </div>

                </div>
              </div>

              {/* Rest of Rankings */}
              <div className="p-6">
                {leaderboardData.slice(3).map((seller) => (
                  <div 
                    key={seller.rank}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors mb-2"
                  >
                    <div className="text-2xl font-bold text-gray-400 w-8">
                      #{seller.rank}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-2xl">
                      {seller.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{seller.name}</h4>
                      <p className="text-sm text-gray-500">{seller.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        {seller.sales}
                      </div>
                      <p className="text-xs text-gray-500">₹{seller.revenue.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-orange-700">{seller.streak}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Achievements */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-gray-900">Achievements</h3>
              </div>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">{achievement.name}</h4>
                      <p className="text-xs text-gray-600">{achievement.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Rank</span>
                  <span className="font-bold text-indigo-600">#42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="font-bold text-gray-900">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue</span>
                  <span className="font-bold text-gray-900">₹8,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Level</span>
                  <span className="font-bold text-gray-900">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-600">Streak</span>
                  </div>
                  <span className="font-bold text-orange-600">5 days</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress to Level 3</span>
                  <span className="text-sm font-medium text-indigo-600">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">7 more sales to reach Level 3</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}