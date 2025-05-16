import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Diff, SplitSquareVertical, BarChart2 } from 'lucide-react';

interface DifferenceViewerProps {
  originalText: string;
  humanizedText: string;
}

const DifferenceViewer: React.FC<DifferenceViewerProps> = ({ 
  originalText, 
  humanizedText 
}) => {
  const [showDiff, setShowDiff] = useState(false);

  // Helper function to highlight differences
  const highlightDifferences = () => {
    if (!originalText || !humanizedText) return null;
    
    // Split texts into words
    const originalWords = originalText.split(/\s+/);
    const humanizedWords = humanizedText.split(/\s+/);
    
    // Simple word-by-word difference highlighting
    // This is a simplified approach - a real diff algorithm would be more sophisticated
    return (
      <div className="p-4 bg-gray-50 border rounded-md overflow-auto h-64">
        {humanizedWords.map((word, index) => {
          const isChanged = originalWords[index] !== word;
          return (
            <span 
              key={index} 
              className={isChanged ? 'bg-green-100 text-green-800' : ''}
            >
              {word}{' '}
            </span>
          );
        })}
      </div>
    );
  };

  // Side-by-side comparison
  const sideBySideComparison = () => {
    if (!originalText || !humanizedText) return null;
    
    return (
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium mb-2">Original Text</div>
          <div className="p-4 bg-gray-50 border rounded-md overflow-auto h-64">
            {originalText}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium mb-2">Humanized Text</div>
          <div className="p-4 bg-blue-50 border-blue-200 border rounded-md overflow-auto h-64">
            {humanizedText}
          </div>
        </div>
      </div>
    );
  };

  if (!showDiff) {
    return (
      <div className="mt-6">
        <Button
          onClick={() => setShowDiff(true)}
          variant="outline"
          className="flex items-center"
        >
          <SplitSquareVertical className="h-4 w-4 mr-2" />
          Show Differences
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Text Comparison</h3>
        <Button
          onClick={() => setShowDiff(false)}
          variant="ghost"
          size="sm"
        >
          Hide
        </Button>
      </div>

      <Tabs defaultValue="sideBySide">
        <TabsList className="mb-4">
          <TabsTrigger value="sideBySide">
            <Diff className="h-4 w-4 mr-2" />
            Side by Side
          </TabsTrigger>
          <TabsTrigger value="highlights">
            <BarChart2 className="h-4 w-4 mr-2" />
            Highlight Changes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sideBySide">
          {sideBySideComparison()}
        </TabsContent>
        <TabsContent value="highlights">
          {highlightDifferences()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DifferenceViewer;