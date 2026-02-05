import { ArrowLeft, Check, FileText, AlertCircle } from 'lucide-react';

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

interface SchemeDetailProps {
  scheme: Scheme;
  onBack: () => void;
  onCheckEligibility: () => void;
  onApply: () => void;
}

export function SchemeDetail({ scheme, onBack, onCheckEligibility, onApply }: SchemeDetailProps) {
  const categoryColors: Record<string, string> = {
    'Health': 'bg-red-100 text-red-700',
    'Housing': 'bg-blue-100 text-blue-700',
    'Education': 'bg-purple-100 text-purple-700',
    'Agriculture': 'bg-green-100 text-green-700',
    'Business': 'bg-orange-100 text-orange-700',
    'Social Security': 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="size-5" />
        <span>Back to schemes</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
              {scheme.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{scheme.title}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[scheme.category] || 'bg-gray-100 text-gray-700'}`}>
                  {scheme.category}
                </span>
              </div>
              <p className="text-gray-600 text-lg">{scheme.description}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCheckEligibility}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Check Eligibility
            </button>
            <button
              onClick={onApply}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Eligibility Criteria */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <AlertCircle className="size-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Eligibility Criteria</h2>
          </div>
          <ul className="space-y-3">
            {scheme.eligibility.map((criteria, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{criteria}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-lg">
              <Check className="size-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Key Benefits</h2>
          </div>
          <ul className="space-y-3">
            {scheme.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="size-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Required Documents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <FileText className="size-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Required Documents</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {scheme.documents.map((document, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <FileText className="size-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{document}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Information Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex gap-3">
          <AlertCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
            <p className="text-blue-800 text-sm">
              Please ensure you meet all eligibility criteria before applying. Keep all required documents ready 
              for a smooth application process. For any queries, contact the concerned department or visit the 
              official government portal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
