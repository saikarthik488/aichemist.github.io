import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface DetectorResult {
  name: string;
  passed: boolean;
  score?: number;
}

interface AdvancedAIDetectionProps {
  results: DetectorResult[];
  loading?: boolean;
}

const AdvancedAIDetection: React.FC<AdvancedAIDetectionProps> = ({ results, loading = false }) => {
  if (loading) {
    return (
      <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium mb-4">AI Detection Results</h3>
        <div className="flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-20 w-20 rounded-full bg-gray-200 mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate overall score
  const passedCount = results.filter(result => result.passed).length;
  const totalCount = results.length;
  const passPercentage = Math.round((passedCount / totalCount) * 100);

  return (
    <div className="mt-6 bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-4">AI Detection Results</h3>
      
      {/* Central score display */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold">
              {passPercentage}%
            </div>
            <div className="absolute -right-1 -bottom-1 bg-green-500 rounded-full p-1">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
          <p className="text-sm mt-2 font-medium text-gray-700">AI Score By AI Detectors</p>
        </div>
      </div>
      
      {/* Detectors grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {results.map((detector, index) => (
          <div 
            key={index} 
            className="flex items-center border rounded-full px-3 py-2 shadow-sm"
          >
            <span className="text-sm font-medium mr-2">{detector.name}</span>
            {detector.passed ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvancedAIDetection;