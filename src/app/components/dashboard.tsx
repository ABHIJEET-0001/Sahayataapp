import { TrendingUp, Clock, CheckCircle, AlertCircle, Star, Sparkles } from 'lucide-react';

interface UserProfile {
  name: string;
  state: string;
  income: string;
  employment: string;
  age: string;
}

interface Scheme {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  matchScore?: number;
}

interface DashboardProps {
  userProfile: UserProfile;
  recommendedSchemes: Scheme[];
  onSchemeClick: (schemeId: string) => void;
}

export function Dashboard({ userProfile, recommendedSchemes, onSchemeClick }: DashboardProps) {
  const stats = [
    { label: 'Schemes Found', value: recommendedSchemes.length, icon: <Star className="size-5" />, color: 'bg-blue-100 text-blue-600' },
    { label: 'Applications', value: '3', icon: <Clock className="size-5" />, color: 'bg-orange-100 text-orange-600' },
    { label: 'Approved', value: '1', icon: <CheckCircle className="size-5" />, color: 'bg-green-100 text-green-600' },
    { label: 'Pending', value: '2', icon: <AlertCircle className="size-5" />, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const categoryColors: Record<string, string> = {
    'Health': 'bg-red-100 text-red-700',
    'Housing': 'bg-blue-100 text-blue-700',
    'Education': 'bg-purple-100 text-purple-700',
    'Agriculture': 'bg-green-100 text-green-700',
    'Business': 'bg-orange-100 text-orange-700',
    'Social Security': 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, {userProfile.name}!</h1>
            <p className="text-blue-50">
              We've found {recommendedSchemes.length} schemes that match your profile
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
            <Sparkles className="size-8" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* AI-Powered Recommendations */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-3 rounded-lg">
            <Sparkles className="size-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">AI-Powered Recommendations</h2>
            <p className="text-sm text-gray-600">Personalized schemes based on your profile</p>
          </div>
        </div>

        <div className="space-y-4">
          {recommendedSchemes.slice(0, 5).map((scheme) => (
            <div
              key={scheme.id}
              onClick={() => onSchemeClick(scheme.id)}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg flex-shrink-0">
                    {scheme.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{scheme.title}</h3>
                      {scheme.matchScore && scheme.matchScore >= 80 && (
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Star className="size-3" />
                          {scheme.matchScore}% Match
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{scheme.description}</p>
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${categoryColors[scheme.category] || 'bg-gray-100 text-gray-700'}`}>
                      {scheme.category}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-blue-600 font-medium whitespace-nowrap">
                  View Details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <TrendingUp className="size-8 text-blue-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Track Applications</h3>
          <p className="text-sm text-gray-600 mb-4">
            Monitor the status of your submitted applications in real-time
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
            View Status
          </button>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <CheckCircle className="size-8 text-green-600 mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Document Checklist</h3>
          <p className="text-sm text-gray-600 mb-4">
            Prepare required documents with our step-by-step guide
          </p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
