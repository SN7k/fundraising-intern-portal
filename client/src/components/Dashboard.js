import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

const Dashboard = () => {
  const { user } = useAuth();
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateUserData = () => {
      if (!user) return;

      // Generate a donation amount based on user's name (for demo purposes)
      const nameHash = user.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const baseDonation = 1000 + (nameHash % 9000); // Random amount between 1000-10000
      
      const userData = {
        name: user.name,
        referralCode: user.referralCode,
        donations: baseDonation
      };

      setInternData(userData);
      setLoading(false);
    };

    generateUserData();
  }, [user]);

  const rewards = [
    {
      name: 'Bronze',
      amount: 1000,
      color: 'bronze',
      icon: '🥉',
      description: 'First milestone achieved!'
    },
    {
      name: 'Silver',
      amount: 5000,
      color: 'silver',
      icon: '🥈',
      description: 'Halfway there!'
    },
    {
      name: 'Gold',
      amount: 10000,
      color: 'gold',
      icon: '🥇',
      description: 'Top performer!'
    }
  ];

  const getRewardStatus = (amount, requiredAmount) => {
    if (amount >= requiredAmount) {
      return 'unlocked';
    } else if (amount >= requiredAmount * 0.5) {
      return 'progress';
    } else {
      return 'locked';
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
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
          Welcome back, {internData?.name}!
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Track your fundraising progress and unlock rewards
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="card p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Intern Name</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 truncate">{internData?.name}</p>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Referral Code</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900 font-mono">{internData?.referralCode}</p>
            </div>
          </div>
        </div>

        <div className="card p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Total Donations</p>
              <p className="text-sm sm:text-lg font-semibold text-gray-900">₹{internData?.donations?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="card p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Rewards & Unlockables</h2>
          <p className="text-sm sm:text-base text-gray-600">Earn badges as you reach fundraising milestones</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rewards.map((reward) => {
            const status = getRewardStatus(internData?.donations || 0, reward.amount);
            const progress = getProgressPercentage(internData?.donations || 0, reward.amount);

            return (
              <div
                key={reward.name}
                className={`relative p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${
                  status === 'unlocked'
                    ? 'border-green-200 bg-green-50'
                    : status === 'progress'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">{reward.icon}</span>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{reward.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">₹{reward.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                    status === 'unlocked'
                      ? 'bg-green-100 text-green-800'
                      : status === 'progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status === 'unlocked' ? 'Unlocked' : status === 'progress' ? 'In Progress' : 'Locked'}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        status === 'unlocked'
                          ? 'bg-green-500'
                          : status === 'progress'
                          ? 'bg-yellow-500'
                          : 'bg-gray-300'
                      }`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600">{reward.description}</p>

                {status === 'unlocked' && (
                  <div className="absolute top-2 right-2">
                    <svg className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 