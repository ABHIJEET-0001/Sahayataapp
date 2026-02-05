import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

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

interface ApplicationFormProps {
  schemes: Scheme[];
}

export function ApplicationForm({ schemes }: ApplicationFormProps) {
  const [selectedScheme, setSelectedScheme] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    aadhaar: '',
    income: '',
    purpose: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would submit to a backend
  };

  const selectedSchemeData = schemes.find(s => s.id === selectedScheme);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="size-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your application has been successfully submitted. You will receive a confirmation email shortly.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Application Reference Number:</strong> SAHAY{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="text-sm text-blue-800 mt-2">
                Please save this reference number for future communication.
              </p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  state: '',
                  pincode: '',
                  aadhaar: '',
                  income: '',
                  purpose: '',
                });
                setSelectedScheme('');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for a Scheme</h2>
          <p className="text-gray-600">
            Fill in your details to apply for a government scheme
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Scheme Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Scheme <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a scheme to apply for</option>
              {schemes.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.title} - {scheme.category}
                </option>
              ))}
            </select>
          </div>

          {selectedSchemeData && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-900 font-medium mb-1">Required Documents:</p>
                <p className="text-sm text-blue-800">
                  {selectedSchemeData.documents.join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
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
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your complete address"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="6-digit PIN"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income (₹) <span className="text-red-500">*</span>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose of Application <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="Briefly describe why you are applying for this scheme"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="size-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PDF, JPG, PNG (Max 5MB each)</p>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-block mt-4 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Select Files
              </label>
            </div>
          </div>

          {/* Declaration */}
          <div className="border-t border-gray-200 pt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                className="mt-1 size-4 text-blue-600"
              />
              <span className="text-sm text-gray-700">
                I hereby declare that the information provided above is true and correct to the best of my knowledge. 
                I understand that any false information may lead to rejection of my application.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6">
            <button
              type="submit"
              className="w-full bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
