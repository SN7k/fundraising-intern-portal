import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use local backend URL for development
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard from:', `${API_BASE_URL}/api/leaderboard`);
        const response = await fetch(`${API_BASE_URL}/api/leaderboard`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Received data from backend:', data);
        setLeaderboardData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        // Fallback to mock data
        const fallbackData = [
          { rank: 1, name: "Priya Sharma", referralCode: "priya2025", donations: 12500 },
          { rank: 2, name: "Rahul Kumar", referralCode: "rahul2025", donations: 9800 },
          { rank: 3, name: "Anjali Patel", referralCode: "anjali2025", donations: 8700 },
          { rank: 4, name: "Shombhunath Karan", referralCode: "shombhunath2025", donations: 6500 },
          { rank: 5, name: "Vikram Singh", referralCode: "vikram2025", donations: 5200 },
          { rank: 6, name: "Meera Reddy", referralCode: "meera2025", donations: 4800 },
          { rank: 7, name: "Arjun Malhotra", referralCode: "arjun2025", donations: 4200 },
          { rank: 8, name: "Zara Khan", referralCode: "zara2025", donations: 3800 }
        ];
        console.log('Using fallback data:', fallbackData);
        setLeaderboardData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [API_BASE_URL]);

  const getRankStyle = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Leaderboard
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          See how you rank among other fundraising interns
        </p>
        {error && (
          <div className="mt-2 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-xs">
            ⚠️ Using fallback data (Backend error: {error})
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <div className="card p-3 sm:p-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Participants</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{leaderboardData.length}</p>
          </div>
        </div>
        <div className="card p-3 sm:p-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Top Donation</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">₹{leaderboardData[0]?.donations?.toLocaleString()}</p>
          </div>
        </div>
        <div className="card p-3 sm:p-6 col-span-2 sm:col-span-1">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Average</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">
              ₹{Math.round(leaderboardData.reduce((sum, item) => sum + item.donations, 0) / leaderboardData.length).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="card p-3 sm:p-6 col-span-2 sm:col-span-1">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Total Raised</p>
            <p className="text-lg sm:text-2xl font-bold text-gray-900">
              ₹{leaderboardData.reduce((sum, item) => sum + item.donations, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="card p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Intern Name
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referral Code
                </th>
                <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donations
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboardData.map((intern, index) => (
                <tr
                  key={intern.rank}
                  className={`transition-all duration-200 ${getRankStyle(intern.rank)}`}
                >
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm sm:text-lg font-semibold mr-1 sm:mr-2">
                        {getRankIcon(intern.rank)}
                      </span>
                      <span className="text-xs sm:text-sm font-medium">
                        #{intern.rank}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-xs sm:text-sm font-medium text-primary-600">
                          {intern.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-2 sm:ml-4">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-20 sm:max-w-32">
                          {intern.name}
                        </div>
                        <div className="sm:hidden text-xs text-gray-500 font-mono">
                          {intern.referralCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm text-gray-900 font-mono">
                      {intern.referralCode}
                    </div>
                  </td>
                  <td className="px-2 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-xs sm:text-sm font-semibold text-gray-900">
                      ₹{intern.donations.toLocaleString()}
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {intern.donations >= 10000 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          🥇 Gold
                        </span>
                      ) : intern.donations >= 5000 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          🥈 Silver
                        </span>
                      ) : intern.donations >= 1000 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          🥉 Bronze
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          🔒 Locked
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
        <div className="flex items-center">
          <span className="mr-1 sm:mr-2">🥇</span>
          <span>Gold (₹10,000+)</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 sm:mr-2">🥈</span>
          <span>Silver (₹5,000+)</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 sm:mr-2">🥉</span>
          <span>Bronze (₹1,000+)</span>
        </div>
        <div className="flex items-center">
          <span className="mr-1 sm:mr-2">🔒</span>
          <span>Locked (&lt;₹1,000)</span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 