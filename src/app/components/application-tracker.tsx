import { CheckCircle, Clock, AlertCircle, FileText, Eye } from 'lucide-react';

interface Application {
  id: string;
  schemeTitle: string;
  category: string;
  appliedDate: string;
  status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'disbursed';
  referenceNumber: string;
  lastUpdated: string;
  timeline: {
    stage: string;
    status: 'completed' | 'current' | 'pending';
    date?: string;
  }[];
}

export function ApplicationTracker() {
  const applications: Application[] = [
    {
      id: '1',
      schemeTitle: 'Pradhan Mantri Awas Yojana',
      category: 'Housing',
      appliedDate: '2026-01-15',
      status: 'approved',
      referenceNumber: 'PMAY202601150001',
      lastUpdated: '2026-01-25',
      timeline: [
        { stage: 'Application Submitted', status: 'completed', date: '2026-01-15' },
        { stage: 'Document Verification', status: 'completed', date: '2026-01-18' },
        { stage: 'Eligibility Check', status: 'completed', date: '2026-01-22' },
        { stage: 'Approval', status: 'completed', date: '2026-01-25' },
        { stage: 'Disbursement', status: 'current' },
      ],
    },
    {
      id: '2',
      schemeTitle: 'Ayushman Bharat',
      category: 'Health',
      appliedDate: '2026-01-20',
      status: 'under-review',
      referenceNumber: 'AB202601200045',
      lastUpdated: '2026-01-27',
      timeline: [
        { stage: 'Application Submitted', status: 'completed', date: '2026-01-20' },
        { stage: 'Document Verification', status: 'completed', date: '2026-01-23' },
        { stage: 'Eligibility Check', status: 'current' },
        { stage: 'Approval', status: 'pending' },
        { stage: 'Card Generation', status: 'pending' },
      ],
    },
    {
      id: '3',
      schemeTitle: 'PM Kisan Samman Nidhi',
      category: 'Agriculture',
      appliedDate: '2026-01-10',
      status: 'disbursed',
      referenceNumber: 'PMKSN202601100123',
      lastUpdated: '2026-01-28',
      timeline: [
        { stage: 'Application Submitted', status: 'completed', date: '2026-01-10' },
        { stage: 'Document Verification', status: 'completed', date: '2026-01-12' },
        { stage: 'Land Verification', status: 'completed', date: '2026-01-16' },
        { stage: 'Approval', status: 'completed', date: '2026-01-20' },
        { stage: 'Amount Disbursed', status: 'completed', date: '2026-01-28' },
      ],
    },
  ];

  const getStatusBadge = (status: Application['status']) => {
    const styles = {
      submitted: 'bg-blue-100 text-blue-700 border-blue-200',
      'under-review': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      disbursed: 'bg-purple-100 text-purple-700 border-purple-200',
    };

    const labels = {
      submitted: 'Submitted',
      'under-review': 'Under Review',
      approved: 'Approved',
      rejected: 'Rejected',
      disbursed: 'Disbursed',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getStatusIcon = (status: 'completed' | 'current' | 'pending') => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="size-5 text-green-600" />;
      case 'current':
        return <Clock className="size-5 text-blue-600 animate-pulse" />;
      default:
        return <div className="size-5 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Your Applications</h2>
        <p className="text-gray-600">Monitor the status of your scheme applications in real-time</p>
      </div>

      <div className="space-y-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{app.schemeTitle}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FileText className="size-4" />
                      {app.referenceNumber}
                    </span>
                    <span>•</span>
                    <span>Applied: {new Date(app.appliedDate).toLocaleDateString('en-IN')}</span>
                  </div>
                </div>
                {getStatusBadge(app.status)}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="size-4" />
                <span>Last updated: {new Date(app.lastUpdated).toLocaleDateString('en-IN')}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
              <h4 className="font-medium text-gray-900 mb-4">Application Progress</h4>
              <div className="relative">
                {app.timeline.map((stage, index) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    {/* Timeline Line */}
                    <div className="relative flex flex-col items-center">
                      {getStatusIcon(stage.status)}
                      {index < app.timeline.length - 1 && (
                        <div
                          className={`absolute top-5 left-1/2 -translate-x-1/2 w-0.5 h-full ${
                            stage.status === 'completed' ? 'bg-green-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>

                    {/* Stage Content */}
                    <div className="flex-1 -mt-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5
                          className={`font-medium ${
                            stage.status === 'completed'
                              ? 'text-gray-900'
                              : stage.status === 'current'
                              ? 'text-blue-600'
                              : 'text-gray-500'
                          }`}
                        >
                          {stage.stage}
                        </h5>
                        {stage.date && (
                          <span className="text-sm text-gray-500">
                            {new Date(stage.date).toLocaleDateString('en-IN')}
                          </span>
                        )}
                      </div>
                      {stage.status === 'current' && (
                        <p className="text-sm text-gray-600">In progress - Expected completion in 2-3 days</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <Eye className="size-4" />
                  View Details
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <FileText className="size-4" />
                  Download Receipt
                </button>
                {app.status === 'disbursed' && (
                  <span className="ml-auto flex items-center gap-2 text-sm text-green-600 font-medium">
                    <CheckCircle className="size-4" />
                    Amount Transferred to Bank Account
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex gap-3">
          <AlertCircle className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
            <p className="text-blue-800 text-sm mb-3">
              If you have questions about your application status or need assistance, you can:
            </p>
            <ul className="text-blue-800 text-sm space-y-1 list-disc ml-4">
              <li>Call our helpline: 1800-XXX-XXXX (Toll-free)</li>
              <li>Email: support@sahayata.gov.in</li>
              <li>Visit your nearest Common Service Center (CSC)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}