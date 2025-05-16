import React from "react";
import { ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PlagiarismResultsProps {
  uniqueness: number;
  similarity: number;
  loading?: boolean;
}

const PlagiarismResults: React.FC<PlagiarismResultsProps> = ({
  uniqueness,
  similarity,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Plagiarism Check</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Checking for plagiarism...</p>
        </div>
      </div>
    );
  }

  const isPlagiarismFree = uniqueness > 90;

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-medium mb-4">Plagiarism Check</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ShieldCheck className={`h-5 w-5 ${isPlagiarismFree ? 'text-green-500' : 'text-amber-500'}`} />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-gray-900">
              {isPlagiarismFree
                ? "No plagiarism detected"
                : "Potential plagiarism detected"}
            </h4>
            <p className="text-sm text-gray-600">
              {isPlagiarismFree
                ? `Your humanized text is ${uniqueness.toFixed(0)}% unique based on our analysis.`
                : `Your text has similarity with existing content. Consider revising.`}
            </p>
            <div className="mt-2">
              <Progress value={uniqueness} className="h-2.5" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Uniqueness: {uniqueness.toFixed(0)}%</span>
                <span>Similarity: {similarity.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlagiarismResults;
