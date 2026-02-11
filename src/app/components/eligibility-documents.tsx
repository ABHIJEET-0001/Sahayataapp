import { useState } from 'react';
import { Check, X, AlertCircle, ChevronRight, FileText, Download, Upload, CheckCircle2, Clock } from 'lucide-react';

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

interface EligibilityDocumentsProps {
  schemes: Scheme[];
}

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  template?: string;
  status: 'pending' | 'uploaded' | 'verified';
}

export function EligibilityDocuments({ schemes }: EligibilityDocumentsProps) {
  const [activeSection, setActiveSection] = useState<'eligibility' | 'documents'>('eligibility');
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    employment: '',
    category: '',
    landOwner: '',
  });

  const [showResults, setShowResults] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Aadhaar Card',
      description: 'Government-issued identity proof',
      required: true,
      status: 'verified',
    },
    {
      id: '2',
      name: 'Income Certificate',
      description: 'Annual income proof from competent authority',
      required: true,
      template: '/templates/income-certificate.pdf',
      status: 'uploaded',
    },
    {
      id: '3',
      name: 'Residence Proof',
      description: 'Utility bill, rental agreement, or property documents',
      required: true,
      status: 'pending',
    },
    {
      id: '4',
      name: 'Bank Account Details',
      description: 'Passbook front page or cancelled cheque',
      required: true,
      status: 'pending',
    },
    {
      id: '5',
      name: 'Category Certificate',
      description: 'SC/ST/OBC certificate if applicable',
      required: false,
      template: '/templates/caste-certificate.pdf',
      status: 'pending',
    },
  ]);

  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const checkEligibility = (scheme: Scheme): boolean => {
    const { income, age, employment, landOwner } = formData;
    
    if (scheme.category === 'Health' && income && parseInt(income) < 600000) return true;
    if (scheme.category === 'Housing' && income && parseInt(income) < 600000) return true;
    if (scheme.category === 'Agriculture' && landOwner === 'yes') return true;
    if (scheme.category === 'Education' && age && parseInt(age) >= 18 && parseInt(age) <= 35) return true;
    if (scheme.category === 'Business' && employment === 'self-employed') return true;
    if (scheme.category === 'Social Security' && age && parseInt(age) >= 18) return true;
    
    return false;
  };

  const eligibleSchemes = schemes.filter(checkEligibility);

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="size-5 text-green-600" />;
      case 'uploaded':
        return <Clock className="size-5 text-yellow-600" />;
      default:
        return <AlertCircle className="size-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'uploaded':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  const completedDocs = documents.filter(d => d.status === 'verified' || d.status === 'uploaded').length;
  const totalDocs = documents.filter(d => d.required).length;
  const progress = (completedDocs / totalDocs) * 100;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-2 flex gap-2">
        <button
          onClick={() => setActiveSection('eligibility')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
            activeSection === 'eligibility'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="size-5" />
            Check Eligibility
          </div>
        </button>
        <button
          onClick={() => setActiveSection('documents')}
          className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
            activeSection === 'documents'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <FileText className="size-5" />
            Prepare Documents
          </div>
        </button>
      </div>

      {/* Eligibility Section */}
      {activeSection === 'eligibility' && (
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
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                              <Check className="size-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">{scheme.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                              <div className="mt-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Required Documents:</p>
                                <div className="flex flex-wrap gap-2">
                                  {scheme.documents.map((doc, idx) => (
                                    <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                      {doc}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                              Eligible
                            </span>
                            <button
                              onClick={() => {
                                setSelectedScheme(scheme);
                                setActiveSection('documents');
                              }}
                              className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                            >
                              Prepare Docs
                            </button>
                          </div>
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
      )}

      {/* Documents Section */}
      {activeSection === 'documents' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Document Preparation Wizard</h2>
            <p className="text-green-100">
              {selectedScheme ? `for ${selectedScheme.title}` : 'Prepare your documents for scheme applications'}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {completedDocs} of {totalDocs} required documents ready
              </span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Document List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4">Document Checklist</h3>
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedDoc?.id === doc.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getStatusIcon(doc.status)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        {doc.required && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(doc.status)}`}>
                          {doc.status === 'verified' && 'Verified'}
                          {doc.status === 'uploaded' && 'Under Review'}
                          {doc.status === 'pending' && 'Not Uploaded'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Document Details */}
            <div>
              {selectedDoc ? (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-4">
                  <h3 className="font-semibold text-gray-900 mb-4">{selectedDoc.name}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-3">{selectedDoc.description}</p>
                      
                      {/* How to Get */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                          <AlertCircle className="size-4" />
                          How to Obtain
                        </h4>
                        <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
                          <li>Visit your nearest government office or authorized center</li>
                          <li>Carry identity proof and address proof</li>
                          <li>Fill the application form (template available)</li>
                          <li>Pay applicable fees (if any)</li>
                          <li>Collect document within 7-15 days</li>
                        </ul>
                      </div>
                    </div>

                    {/* Template Download */}
                    {selectedDoc.template && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Download Template</h4>
                        <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <Download className="size-4" />
                          Download Application Form
                        </button>
                      </div>
                    )}

                    {/* Upload Section */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Upload Document</h4>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                        <Upload className="size-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">Drag & drop or click to upload</p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 2MB)</p>
                        <input
                          type="file"
                          className="hidden"
                          id={`upload-${selectedDoc.id}`}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label
                          htmlFor={`upload-${selectedDoc.id}`}
                          className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer text-sm"
                        >
                          Choose File
                        </label>
                      </div>
                    </div>

                    {/* Status */}
                    {selectedDoc.status !== 'pending' && (
                      <div className={`border rounded-lg p-4 ${
                        selectedDoc.status === 'verified'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          {selectedDoc.status === 'verified' ? (
                            <>
                              <CheckCircle2 className="size-5 text-green-600" />
                              <span className="text-sm font-medium text-green-900">
                                Document Verified
                              </span>
                            </>
                          ) : (
                            <>
                              <Clock className="size-5 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-900">
                                Under Review (2-3 days)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-12 border border-gray-200 text-center">
                  <FileText className="size-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Select a document to view details and upload</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {completedDocs === totalDocs ? (
                  <span className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle2 className="size-5" />
                    All required documents ready!
                  </span>
                ) : (
                  <span>
                    Complete all required documents to proceed with application
                  </span>
                )}
              </div>
              <button
                disabled={completedDocs < totalDocs}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  completedDocs === totalDocs
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Proceed to Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
