import { Check, X, Plus, Trash2 } from 'lucide-react';

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

interface SchemeComparisonProps {
  schemes: Scheme[];
  selectedSchemes: string[];
  onAddScheme: (schemeId: string) => void;
  onRemoveScheme: (schemeId: string) => void;
}

export function SchemeComparison({ schemes, selectedSchemes, onAddScheme, onRemoveScheme }: SchemeComparisonProps) {
  const comparisonSchemes = schemes.filter(s => selectedSchemes.includes(s.id));
  const maxSchemes = 3;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compare Schemes</h2>
        <p className="text-gray-600">
          Select up to {maxSchemes} schemes to compare side by side
        </p>
      </div>

      {/* Scheme Selector */}
      {comparisonSchemes.length < maxSchemes && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Add Schemes to Compare</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {schemes
              .filter(s => !selectedSchemes.includes(s.id))
              .map((scheme) => (
                <button
                  key={scheme.id}
                  onClick={() => onAddScheme(scheme.id)}
                  className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                >
                  <Plus className="size-4 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate">{scheme.title}</span>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Comparison Table */}
      {comparisonSchemes.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left bg-gray-50 sticky left-0 z-10">
                    <div className="text-sm font-semibold text-gray-900 w-32">Features</div>
                  </th>
                  {comparisonSchemes.map((scheme) => (
                    <th key={scheme.id} className="p-4 bg-gray-50 min-w-64">
                      <div className="text-left">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 text-sm">{scheme.title}</h3>
                          <button
                            onClick={() => onRemoveScheme(scheme.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                          >
                            <Trash2 className="size-4 text-gray-500" />
                          </button>
                        </div>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {scheme.category}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Description */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 bg-gray-50 sticky left-0 z-10">
                    <div className="text-sm font-medium text-gray-700 w-32">Description</div>
                  </td>
                  {comparisonSchemes.map((scheme) => (
                    <td key={scheme.id} className="p-4">
                      <p className="text-sm text-gray-600">{scheme.description}</p>
                    </td>
                  ))}
                </tr>

                {/* Eligibility */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 bg-gray-50 sticky left-0 z-10">
                    <div className="text-sm font-medium text-gray-700 w-32">Eligibility</div>
                  </td>
                  {comparisonSchemes.map((scheme) => (
                    <td key={scheme.id} className="p-4">
                      <ul className="space-y-2">
                        {scheme.eligibility.map((criteria, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Benefits */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 bg-gray-50 sticky left-0 z-10">
                    <div className="text-sm font-medium text-gray-700 w-32">Key Benefits</div>
                  </td>
                  {comparisonSchemes.map((scheme) => (
                    <td key={scheme.id} className="p-4">
                      <ul className="space-y-2">
                        {scheme.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Required Documents */}
                <tr className="border-b border-gray-100">
                  <td className="p-4 bg-gray-50 sticky left-0 z-10">
                    <div className="text-sm font-medium text-gray-700 w-32">Documents</div>
                  </td>
                  {comparisonSchemes.map((scheme) => (
                    <td key={scheme.id} className="p-4">
                      <ul className="space-y-1">
                        {scheme.documents.map((doc, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {doc}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Actions */}
                <tr>
                  <td className="p-4 bg-gray-50 sticky left-0 z-10"></td>
                  {comparisonSchemes.map((scheme) => (
                    <td key={scheme.id} className="p-4">
                      <div className="flex flex-col gap-2">
                        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Apply Now
                        </button>
                        <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                          View Details
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="bg-gray-100 size-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="size-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No schemes selected</h3>
          <p className="text-gray-600">
            Add schemes from the list above to compare their features side by side
          </p>
        </div>
      )}
    </div>
  );
}
