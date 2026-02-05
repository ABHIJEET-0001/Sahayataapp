import { useState } from 'react';
import { Check, X, AlertCircle, ChevronRight } from 'lucide-react';

interface Scheme {
  id: string;
  title: string;
  category: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  documents: string[];
  icon: React.ReactNode;
}

interface EligibilityCheckerProps {
  schemes: Scheme[];
}

export function EligibilityChecker({ schemes }: EligibilityCheckerProps) {
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    employment: '',
    category: '',
    landOwner: '',
  });

  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const checkEligibility = (scheme: Scheme): boolean => {
    // Simple eligibility check based on form data
    const { income, age, employment, category, landOwner } = formData;
    
    if (scheme.category === 'Health' && income && parseInt(income) < 600000) return true;
    if (scheme.category === 'Housing' && income && parseInt(income) < 600000) return true;
    if (scheme.category === 'Agriculture' && landOwner === 'yes') return true;
    if (scheme.category === 'Education' && age && parseInt(age) >= 18 && parseInt(age) <= 35) return true;
    if (scheme.category === 'Business' && employment === 'self-employed') return true;
    if (scheme.category === 'Social Security' && age && parseInt(age) >= 18) return true;
    
    return false;
  };

  const eligibleSchemes = schemes.filter(checkEligibility);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Eligibility</h2>
          <p className="text-gray-600">
            Answer a few questions to find schemes you're eligible for
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Annual Income */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Income (₹)
            </label>
            <input
              type="number"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: e.target.value })}
              placeholder="Enter your annual income"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter your age"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Employment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Status
            </label>
            <select
              value={formData.employment}
              onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select employment status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self Employed</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* Social Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Social Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select category</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="ews">EWS</option>
            </select>
          </div>

          {/* Land Ownership */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do you own agricultural land?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="landOwner"
                  value="yes"
                  checked={formData.landOwner === 'yes'}
                  onChange={(e) => setFormData({ ...formData, landOwner: e.target.value })}
                  className="size-4 text-blue-600"
                />
                <span className="text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="landOwner"
                  value="no"
                  checked={formData.landOwner === 'no'}
                  onChange={(e) => setFormData({ ...formData, landOwner: e.target.value })}
                  className="size-4 text-blue-600"
                />
                <span className="text-gray-700">No</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            Check Eligibility
            <ChevronRight className="size-5" />
          </button>
        </form>

        {/* Results */}
        {showResults && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Eligibility Results
            </h3>

            {eligibleSchemes.length > 0 ? (
              <>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <Check className="size-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-green-900 mb-1">Great news!</p>
                    <p className="text-green-800 text-sm">
                      You are eligible for {eligibleSchemes.length} scheme{eligibleSchemes.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {eligibleSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-100 p-2 rounded-lg">
                            <Check className="size-4 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{scheme.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Eligible
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 flex items-start gap-3">
                <AlertCircle className="size-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-orange-900 mb-1">No eligible schemes found</p>
                  <p className="text-orange-800 text-sm">
                    Based on your responses, you don't currently match the eligibility criteria for the schemes in our database. 
                    Please check back later as new schemes are added regularly.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
