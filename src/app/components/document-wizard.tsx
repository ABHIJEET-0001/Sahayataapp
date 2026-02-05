import { useState } from 'react';
import { FileText, Check, X, Download, Upload, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  description: string;
  required: boolean;
  template?: string;
  status: 'pending' | 'uploaded' | 'verified';
}

interface DocumentWizardProps {
  schemeName: string;
  requiredDocuments: string[];
}

export function DocumentWizard({ schemeName, requiredDocuments }: DocumentWizardProps) {
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
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Document Preparation Wizard</h2>
          <p className="text-blue-100">for {schemeName}</p>
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
                    ? 'border-blue-500 bg-blue-50'
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
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
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
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
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
                        className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer text-sm"
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
    </div>
  );
}