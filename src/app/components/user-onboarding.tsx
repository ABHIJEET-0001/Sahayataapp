import { useState } from 'react';
import { ChevronRight, User, MapPin, Briefcase, Heart, GraduationCap, Languages } from 'lucide-react';

interface OnboardingData {
  name: string;
  phone: string;
  email: string;
  aadhaar: string;
  language: string;
  state: string;
  district: string;
  pincode: string;
  age: string;
  gender: string;
  category: string;
  income: string;
  employment: string;
  education: string;
  disability: string;
  maritalStatus: string;
  landOwner: string;
  businessOwner: string;
}

interface UserOnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export function UserOnboarding({ onComplete }: UserOnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    name: '',
    phone: '',
    email: '',
    aadhaar: '',
    language: 'en',
    state: '',
    district: '',
    pincode: '',
    age: '',
    gender: '',
    category: '',
    income: '',
    employment: '',
    education: '',
    disability: 'no',
    maritalStatus: '',
    landOwner: 'no',
    businessOwner: 'no',
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-green-600 p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome to Sahayata</h1>
          <p className="text-blue-50">Let's set up your profile to find schemes tailored for you</p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-green-600 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <User className="size-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                  <p className="text-sm text-gray-600">Tell us about yourself</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Language
                </label>
                <div className="relative">
                  <Languages className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="As per Aadhaar card"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhaar Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Your data is encrypted and secure</p>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="size-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Location Details</h2>
                  <p className="text-sm text-gray-600">Help us find local schemes for you</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Rajasthan">Rajasthan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Enter district"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}

          {/* Step 3: Demographics */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Heart className="size-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Personal Details</h2>
                  <p className="text-sm text-gray-600">For better scheme matching</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Your age"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select</option>
                    <option value="general">General</option>
                    <option value="obc">OBC</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                    <option value="ews">EWS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status
                  </label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have any disability?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="disability"
                      value="yes"
                      checked={formData.disability === 'yes'}
                      onChange={(e) => setFormData({ ...formData, disability: e.target.value })}
                      className="size-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="disability"
                      value="no"
                      checked={formData.disability === 'no'}
                      onChange={(e) => setFormData({ ...formData, disability: e.target.value })}
                      className="size-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Economic Details */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Briefcase className="size-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Economic Information</h2>
                  <p className="text-sm text-gray-600">To identify relevant benefits</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  placeholder="Family annual income"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Employment Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employment}
                  onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select</option>
                  <option value="employed">Employed (Salaried)</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="farmer">Farmer</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="student">Student</option>
                  <option value="retired">Retired</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select</option>
                  <option value="below-10">Below 10th</option>
                  <option value="10th">10th Pass</option>
                  <option value="12th">12th Pass</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Post Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you own agricultural land?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="landOwner"
                      value="yes"
                      checked={formData.landOwner === 'yes'}
                      onChange={(e) => setFormData({ ...formData, landOwner: e.target.value })}
                      className="size-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="landOwner"
                      value="no"
                      checked={formData.landOwner === 'no'}
                      onChange={(e) => setFormData({ ...formData, landOwner: e.target.value })}
                      className="size-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you own a business?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="businessOwner"
                      value="yes"
                      checked={formData.businessOwner === 'yes'}
                      onChange={(e) => setFormData({ ...formData, businessOwner: e.target.value })}
                      className="size-4"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="businessOwner"
                      value="no"
                      checked={formData.businessOwner === 'no'}
                      onChange={(e) => setFormData({ ...formData, businessOwner: e.target.value })}
                      className="size-4"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="px-6 pb-6 flex items-center justify-between gap-4">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            {step === totalSteps ? 'Complete Setup' : 'Continue'}
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
