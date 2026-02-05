import { ArrowRight } from 'lucide-react';

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

interface SchemeCardProps {
  scheme: Scheme;
  onClick: () => void;
}

export function SchemeCard({ scheme, onClick }: SchemeCardProps) {
  const categoryColors: Record<string, string> = {
    'Health': 'bg-red-100 text-red-700',
    'Housing': 'bg-blue-100 text-blue-700',
    'Education': 'bg-purple-100 text-purple-700',
    'Agriculture': 'bg-green-100 text-green-700',
    'Business': 'bg-orange-100 text-orange-700',
    'Social Security': 'bg-indigo-100 text-indigo-700',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg">
            {scheme.icon}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs ${categoryColors[scheme.category] || 'bg-gray-100 text-gray-700'}`}>
            {scheme.category}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {scheme.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {scheme.description}
        </p>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Key Benefits:</p>
          <ul className="space-y-1">
            {scheme.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="line-clamp-1">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-blue-600 font-medium">Learn more</span>
          <ArrowRight className="size-4 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
