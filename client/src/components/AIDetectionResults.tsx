import React from "react";
import { Progress } from "@/components/ui/progress";

interface AIDetectionResultsProps {
  gptDetector: number;
  zeroGPT: number;
  contentDetective: number;
  loading?: boolean;
}

const AIDetectionResults: React.FC<AIDetectionResultsProps> = ({
  gptDetector,
  zeroGPT,
  contentDetective,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">AI Detection Analysis</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            Analyzing AI detection metrics...
          </p>
        </div>
      </div>
    );
  }

  const detectionMetrics = [
    {
      name: "GPT Detector",
      score: gptDetector,
      passed: gptDetector < 20,
    },
    {
      name: "ZeroGPT",
      score: zeroGPT,
      passed: zeroGPT < 20,
    },
    {
      name: "Content Detective",
      score: contentDetective,
      passed: contentDetective < 20,
    },
  ];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">AI Detection Analysis</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {detectionMetrics.map((metric) => (
          <div key={metric.name} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">{metric.name}</h4>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  metric.passed
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {metric.passed ? "PASSED" : "FAILED"}
              </span>
            </div>
            <div className="mt-2">
              <Progress
                value={metric.score}
                className={`h-2.5 ${
                  metric.passed ? "bg-green-200" : "bg-red-200"
                }`}
              />
              <div className="text-xs text-gray-500 mt-1">
                <span>AI Detection Score: {metric.score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIDetectionResults;
