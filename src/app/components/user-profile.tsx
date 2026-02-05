import { useState } from 'react';
import { User, MapPin, Briefcase, Heart, Edit2, Save, X, Phone, Mail, CreditCard, Languages, Home, GraduationCap } from 'lucide-react';

interface UserProfile {
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

interface UserProfileProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
}

export function UserProfileComponent({ profile, onUpdate }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSave = () => {
    onUpdate(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
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

  const getLanguageName = (code: string) => {
    return languages.find(l => l.code === code)?.name || code;
  };

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const formatCategory = (category: string) => {
    return category.toUpperCase();
  };

  const formatEmployment = (employment: string) => {
    return employment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatEducation = (education: string) => {
    if (!education) return 'Not specified';
    return education.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const maskAadhaar = (aadhaar: string) => {
    if (aadhaar.length < 12) return aadhaar;
    return `XXXX XXXX ${aadhaar.slice(-4)}`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-green-600 p-6 text-white relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                <User className="size-12" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
                <div className="flex items-center gap-4 text-sm text-blue-50">
                  <span className="flex items-center gap-1">
                    <Phone className="size-4" />
                    {profile.phone}
                  </span>
                  {profile.email && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="size-4" />
                        {profile.email}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors"
              >
                <Edit2 className="size-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-white text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors"
                >
                  <Save className="size-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition-colors"
                >
                  <X className="size-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Basic Information */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="size-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Mobile Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.email || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <CreditCard className="size-4" />
                  Aadhaar Number
                </label>
                <p className="text-gray-900 font-medium">{maskAadhaar(profile.aadhaar)}</p>
                <p className="text-xs text-gray-500 mt-1">For security, only last 4 digits shown</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <Languages className="size-4" />
                  Preferred Language
                </label>
                {isEditing ? (
                  <select
                    value={editedProfile.language}
                    onChange={(e) => setEditedProfile({ ...editedProfile, language: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{getLanguageName(profile.language)}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <MapPin className="size-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Location Details</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                {isEditing ? (
                  <select
                    value={editedProfile.state}
                    onChange={(e) => setEditedProfile({ ...editedProfile, state: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                ) : (
                  <p className="text-gray-900 font-medium">{profile.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">District</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.district}
                    onChange={(e) => setEditedProfile({ ...editedProfile, district: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.district}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">PIN Code</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.pincode}
                    onChange={(e) => setEditedProfile({ ...editedProfile, pincode: e.target.value })}
                    maxLength={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.pincode}</p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Heart className="size-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Personal Details</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 bg-gray-50 rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">{profile.age} years</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                {isEditing ? (
                  <select
                    value={editedProfile.gender}
                    onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{formatGender(profile.gender)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Social Category</label>
                {isEditing ? (
                  <select
                    value={editedProfile.category}
                    onChange={(e) => setEditedProfile({ ...editedProfile, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="general">General</option>
                    <option value="obc">OBC</option>
                    <option value="sc">SC</option>
                    <option value="st">ST</option>
                    <option value="ews">EWS</option>
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{formatCategory(profile.category)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Marital Status</label>
                {isEditing ? (
                  <select
                    value={editedProfile.maritalStatus}
                    onChange={(e) => setEditedProfile({ ...editedProfile, maritalStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widowed">Widowed</option>
                    <option value="divorced">Divorced</option>
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{profile.maritalStatus ? formatGender(profile.maritalStatus) : 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Disability Status</label>
                <p className="text-gray-900 font-medium">{profile.disability === 'yes' ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          {/* Economic Information */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Briefcase className="size-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Economic Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Annual Income</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile.income}
                    onChange={(e) => setEditedProfile({ ...editedProfile, income: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 font-medium">₹{parseInt(profile.income).toLocaleString('en-IN')}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Employment Status</label>
                {isEditing ? (
                  <select
                    value={editedProfile.employment}
                    onChange={(e) => setEditedProfile({ ...editedProfile, employment: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="employed">Employed (Salaried)</option>
                    <option value="self-employed">Self Employed</option>
                    <option value="farmer">Farmer</option>
                    <option value="unemployed">Unemployed</option>
                    <option value="student">Student</option>
                    <option value="retired">Retired</option>
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{formatEmployment(profile.employment)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <GraduationCap className="size-4" />
                  Education Level
                </label>
                {isEditing ? (
                  <select
                    value={editedProfile.education}
                    onChange={(e) => setEditedProfile({ ...editedProfile, education: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
                    <option value="below-10">Below 10th</option>
                    <option value="10th">10th Pass</option>
                    <option value="12th">12th Pass</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Post Graduate</option>
                  </select>
                ) : (
                  <p className="text-gray-900 font-medium">{formatEducation(profile.education)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <Home className="size-4" />
                  Asset Ownership
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Agricultural Land</span>
                    <span className="text-gray-900 font-medium">{profile.landOwner === 'yes' ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Business</span>
                    <span className="text-gray-900 font-medium">{profile.businessOwner === 'yes' ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <User className="size-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Profile Completion</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Your profile is complete! This information helps us recommend the best schemes for you.
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-green-600" style={{ width: '100%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
