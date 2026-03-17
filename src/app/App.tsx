import { useState, useEffect } from 'react';
import { Search, Menu, User, Bell, FileText, Heart, Home as HomeIcon, Briefcase, GraduationCap, TrendingUp, LayoutDashboard, GitCompare, Clock, UserCircle, LogOut, CheckCircle2, Languages } from 'lucide-react';
import { SchemeCard } from '@/app/components/scheme-card';
import { CategoryButton } from '@/app/components/category-button';
import { SchemeDetail } from '@/app/components/scheme-detail';
import { EligibilityChecker } from '@/app/components/eligibility-checker';
import { ApplicationForm } from '@/app/components/application-form';
import { UserOnboarding } from '@/app/components/user-onboarding';
import { Dashboard } from '@/app/components/dashboard';
import { DocumentWizard } from '@/app/components/document-wizard';
import { ApplicationTracker } from '@/app/components/application-tracker';
import { NotificationCenter } from '@/app/components/notification-center';
import { SchemeComparison } from '@/app/components/scheme-comparison';
import { UserProfileComponent } from '@/app/components/user-profile';
import { Login } from '@/app/components/login';
import { Signup } from '@/app/components/signup';
import { EligibilityDocuments } from '@/app/components/eligibility-documents';
import { Chatbot } from '@/app/components/chatbot';
import { translations, type Language } from '@/app/utils/translations';

// Mock data for government schemes
const schemes = [
  {
    id: '1',
    title: 'Pradhan Mantri Awas Yojana',
    category: 'Housing',
    description: 'Affordable housing for all by providing financial assistance for construction and purchase of houses.',
    eligibility: ['Annual income below ₹6 lakh', 'First-time home buyer', 'Indian citizen'],
    benefits: ['Subsidy up to ₹2.67 lakh', 'Lower interest rates', 'Extended loan tenure'],
    documents: ['Aadhaar Card', 'Income Certificate', 'Property Documents'],
    icon: <HomeIcon className="size-6" />
  },
  {
    id: '2',
    title: 'Ayushman Bharat',
    category: 'Health',
    description: 'National Health Protection Scheme providing health coverage up to ₹5 lakh per family per year.',
    eligibility: ['Economically weaker sections', 'Below Poverty Line families', 'No family income limit'],
    benefits: ['Free treatment up to ₹5 lakh', 'Cashless hospitalization', 'Coverage for 1,350+ procedures'],
    documents: ['Aadhaar Card', 'Ration Card', 'Income Certificate'],
    icon: <Heart className="size-6" />
  },
  {
    id: '3',
    title: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    description: 'Income support to all farmer families with cultivable land holding.',
    eligibility: ['Small and marginal farmers', 'Land ownership proof required', 'Indian citizen'],
    benefits: ['₹6,000 per year', 'Direct bank transfer', 'Three equal installments'],
    documents: ['Land ownership papers', 'Aadhaar Card', 'Bank account details'],
    icon: <TrendingUp className="size-6" />
  },
  {
    id: '4',
    title: 'Skill India Mission',
    category: 'Education',
    description: 'Skill development and vocational training programs for youth and job seekers.',
    eligibility: ['Age 18-35 years', 'Indian citizen', 'Willing to undergo skill training'],
    benefits: ['Free skill training', 'Industry recognized certification', 'Job placement assistance'],
    documents: ['Aadhaar Card', 'Educational certificates', 'Age proof'],
    icon: <GraduationCap className="size-6" />
  },
  {
    id: '5',
    title: 'MUDRA Loan Yojana',
    category: 'Business',
    description: 'Financial support for micro and small business enterprises.',
    eligibility: ['Small business owners', 'Entrepreneurs', 'No income limit'],
    benefits: ['Loan up to ₹10 lakh', 'No collateral required', 'Flexible repayment'],
    documents: ['Business plan', 'Aadhaar Card', 'Bank statements'],
    icon: <Briefcase className="size-6" />
  },
  {
    id: '6',
    title: 'National Pension Scheme',
    category: 'Social Security',
    description: 'Pension scheme for securing retirement with government and private sector participation.',
    eligibility: ['Age 18-70 years', 'Indian citizen', 'Any employment status'],
    benefits: ['Tax benefits under 80C', 'Market-linked returns', 'Pension after 60'],
    documents: ['Aadhaar Card', 'PAN Card', 'Bank account details'],
    icon: <FileText className="size-6" />
  },
];

const categories = [
  { name: 'All', icon: <Menu className="size-5" /> },
  { name: 'Health', icon: <Heart className="size-5" /> },
  { name: 'Housing', icon: <HomeIcon className="size-5" /> },
  { name: 'Education', icon: <GraduationCap className="size-5" /> },
  { name: 'Agriculture', icon: <TrendingUp className="size-5" /> },
  { name: 'Business', icon: <Briefcase className="size-5" /> },
  { name: 'Social Security', icon: <FileText className="size-5" /> },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schemes' | 'eligibility-docs' | 'apply' | 'track' | 'compare' | 'profile'>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [comparisonSchemes, setComparisonSchemes] = useState<string[]>([]);
  const [authState, setAuthState] = useState<'login' | 'signup' | 'authenticated'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [language, setLanguage] = useState<Language>('en');

  // Check for existing session on mount
  useEffect(() => {
    const sessionData = localStorage.getItem('sahayata_session') || sessionStorage.getItem('sahayata_session');
    const profileData = localStorage.getItem('sahayata_profile');
    const savedLanguage = localStorage.getItem('sahayata_language') as Language;
    
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    if (sessionData) {
      const session = JSON.parse(sessionData);
      setCurrentUser(session);
      setIsAuthenticated(true);
      setAuthState('authenticated');
      
      // Load profile if exists
      if (profileData) {
        setUserProfile(JSON.parse(profileData));
      } else {
        setShowOnboarding(true);
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    localStorage.setItem('sahayata_language', newLang);
  };

  const t = translations[language];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesSearch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentScheme = schemes.find(s => s.id === selectedScheme);

  // Calculate AI match scores based on user profile
  const recommendedSchemes = userProfile ? schemes.map(scheme => {
    let matchScore = 60;
    const income = parseInt(userProfile.income);
    
    // Score based on user profile
    if (scheme.category === 'Health' && income < 600000) matchScore += 20;
    if (scheme.category === 'Housing' && income < 600000) matchScore += 20;
    if (scheme.category === 'Agriculture' && userProfile.landOwner === 'yes') matchScore += 30;
    if (scheme.category === 'Education' && parseInt(userProfile.age) >= 18 && parseInt(userProfile.age) <= 35) matchScore += 25;
    if (scheme.category === 'Business' && userProfile.employment === 'self-employed') matchScore += 25;
    if (scheme.category === 'Social Security' && parseInt(userProfile.age) >= 18) matchScore += 15;
    
    return { ...scheme, matchScore: Math.min(matchScore, 100) };
  }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)) : [];

  const handleOnboardingComplete = (data: any) => {
    setUserProfile(data);
    localStorage.setItem('sahayata_profile', JSON.stringify(data));
    setShowOnboarding(false);
    setActiveTab('dashboard');
  };

  const handleLoginSuccess = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setAuthState('authenticated');
    
    // Check if user has profile
    const profileData = localStorage.getItem('sahayata_profile');
    if (profileData) {
      setUserProfile(JSON.parse(profileData));
    } else {
      setShowOnboarding(true);
    }
  };

  const handleSignupSuccess = (userData: any) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
    setAuthState('authenticated');
    setShowOnboarding(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sahayata_session');
    sessionStorage.removeItem('sahayata_session');
    localStorage.removeItem('sahayata_profile');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthState('login');
    setUserProfile(null);
    setShowOnboarding(false);
  };

  // Show login/signup if not authenticated
  if (!isAuthenticated) {
    if (authState === 'login') {
      return <Login onLoginSuccess={handleLoginSuccess} onSwitchToSignup={() => setAuthState('signup')} />;
    }
    if (authState === 'signup') {
      return <Signup onSignupSuccess={handleSignupSuccess} onSwitchToLogin={() => setAuthState('login')} />;
    }
  }

  if (showOnboarding) {
    return <UserOnboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-br from-orange-500 to-green-600 p-2 rounded-lg shadow-md">
                <FileText className="size-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Sahayata</h1>
                <p className="text-xs text-gray-500">Government Schemes Helper</p>
              </div>
            </button>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              >
                <Languages className="size-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {language === 'en' ? 'हिंदी' : 'English'}
                </span>
              </button>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Bell className="size-5 text-gray-600" />
                <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{currentUser?.fullName}</p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <User className="size-5 text-gray-600" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title={t.logout}
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">{t.logout}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Notification Center */}
      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        {activeTab !== 'dashboard' && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {activeTab === 'schemes' && t.discoverSchemes}
              {activeTab === 'eligibility-docs' && t.checkEligibilityTitle}
              {activeTab === 'apply' && t.applyTitle}
              {activeTab === 'track' && t.trackTitle}
              {activeTab === 'compare' && t.compareTitle}
              {activeTab === 'profile' && t.profileTitle}
            </h2>
            <p className="text-gray-600">
              {activeTab === 'schemes' && t.discoverDesc}
              {activeTab === 'eligibility-docs' && t.checkEligibilityDesc}
              {activeTab === 'apply' && t.applyDesc}
              {activeTab === 'track' && t.trackDesc2}
              {activeTab === 'compare' && t.compareDesc}
              {activeTab === 'profile' && t.profileDesc}
            </p>
          </div>
        )}

        {/* Search Bar - Show on schemes tab */}
        {activeTab === 'schemes' && (
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Category Tabs - Show on schemes tab */}
        {activeTab === 'schemes' && (
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <CategoryButton
                  key={category.name}
                  name={category.name}
                  icon={category.icon}
                  isActive={selectedCategory === category.name}
                  onClick={() => setSelectedCategory(category.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-6 border-b border-gray-200 bg-white rounded-t-xl px-4">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`pb-4 pt-4 px-2 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 font-medium ${
                activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <LayoutDashboard className="size-4" />
              {t.dashboard}
            </button>
            <button
              onClick={() => setActiveTab('schemes')}
              className={`pb-4 pt-4 px-2 border-b-2 transition-all whitespace-nowrap font-medium ${
                activeTab === 'schemes'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.browseSchemes}
            </button>
            <button
              onClick={() => setActiveTab('eligibility-docs')}
              className={`pb-4 pt-4 px-2 border-b-2 transition-all whitespace-nowrap font-medium ${
                activeTab === 'eligibility-docs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.checkEligibility}
            </button>
            <button
              onClick={() => setActiveTab('apply')}
              className={`pb-4 pt-4 px-2 border-b-2 transition-all whitespace-nowrap font-medium ${
                activeTab === 'apply'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {t.applyNow}
            </button>
            <button
              onClick={() => setActiveTab('track')}
              className={`pb-4 pt-4 px-2 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 font-medium ${
                activeTab === 'track'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Clock className="size-4" />
              {t.trackStatus}
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`pb-4 pt-4 px-2 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 font-medium ${
                activeTab === 'compare'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <GitCompare className="size-4" />
              {t.compare}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 pt-4 px-2 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 font-medium ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserCircle className="size-4" />
              {t.profile}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'dashboard' && (
          <Dashboard
            userProfile={userProfile}
            recommendedSchemes={recommendedSchemes}
            onSchemeClick={(id) => {
              setSelectedScheme(id);
              setActiveTab('schemes');
            }}
            onNavigate={(tab) => setActiveTab(tab as any)}
            language={language}
          />
        )}

        {activeTab === 'schemes' && (
          <>
            {/* Scheme Cards Grid */}
            {!selectedScheme ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSchemes.map((scheme) => (
                  <SchemeCard
                    key={scheme.id}
                    scheme={scheme}
                    onClick={() => setSelectedScheme(scheme.id)}
                  />
                ))}
              </div>
            ) : (
              <SchemeDetail
                scheme={currentScheme!}
                onBack={() => setSelectedScheme(null)}
                onCheckEligibility={() => setActiveTab('eligibility-docs')}
                onApply={() => setActiveTab('apply')}
              />
            )}

            {filteredSchemes.length === 0 && (
              <div className="text-center py-12">
                <FileText className="size-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
                <p className="text-gray-600">Try adjusting your search or category filter</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'eligibility-docs' && (
          <EligibilityDocuments schemes={schemes} />
        )}

        {activeTab === 'apply' && (
          <ApplicationForm schemes={schemes} />
        )}

        {activeTab === 'track' && (
          <ApplicationTracker />
        )}

        {activeTab === 'compare' && (
          <SchemeComparison
            schemes={schemes}
            selectedSchemes={comparisonSchemes}
            onAddScheme={(id) => setComparisonSchemes([...comparisonSchemes, id])}
            onRemoveScheme={(id) => setComparisonSchemes(comparisonSchemes.filter(s => s !== id))}
          />
        )}

        {activeTab === 'profile' && (
          <UserProfileComponent profile={userProfile} onUpdate={(updatedProfile) => setUserProfile(updatedProfile)} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">{t.copyright}</p>
            <p className="text-sm">{t.tagline}</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}