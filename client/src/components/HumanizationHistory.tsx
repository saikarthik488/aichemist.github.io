import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { History, Trash2, ClipboardCopy, AlertTriangle } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

interface HistoryEntry {
  id: string;
  originalText: string;
  humanizedText: string;
  timestamp: number;
}

const HumanizationHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<HistoryEntry | null>(null);
  const { toast } = useToast();

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('humanizationHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse history:', error);
      }
    }
  }, []);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    });
  };

  const handleDeleteEntry = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('humanizationHistory', JSON.stringify(updatedHistory));
    toast({
      title: "Entry deleted",
      description: "The history entry has been removed.",
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('humanizationHistory');
    toast({
      title: "History cleared",
      description: "All history entries have been removed.",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (history.length === 0) {
    return (
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5" />
            Humanization History
          </CardTitle>
          <CardDescription>
            Your previous text humanization results will appear here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center text-gray-500">
          <AlertTriangle className="h-12 w-12 mb-4 text-gray-400" />
          <p>No history found</p>
          <p className="text-sm mt-2">
            Humanized text will be saved here automatically. Your data is stored only in your browser's local storage.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <History className="mr-2 h-5 w-5" />
            Humanization History
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearHistory}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        </div>
        <CardDescription>
          Your previous text humanization results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {history.map((entry) => (
              <div 
                key={entry.id} 
                className="p-3 bg-gray-50 rounded-md border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-gray-500">
                    {formatDate(entry.timestamp)}
                  </span>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6" 
                      onClick={() => handleCopyText(entry.humanizedText)}
                    >
                      <ClipboardCopy className="h-3 w-3" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-red-500" 
                      onClick={() => handleDeleteEntry(entry.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start p-2 text-left h-auto" 
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <p className="text-sm font-normal line-clamp-2">
                        {truncateText(entry.humanizedText)}
                      </p>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Humanized Text</DialogTitle>
                      <DialogDescription>
                        Created on {formatDate(entry.timestamp)}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-auto p-2">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Original Text</h3>
                        <div className="p-3 bg-gray-50 border rounded-md whitespace-pre-wrap text-sm">
                          {entry.originalText}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Humanized Text</h3>
                        <div className="p-3 bg-blue-50 border-blue-200 border rounded-md whitespace-pre-wrap text-sm">
                          {entry.humanizedText}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyText(entry.humanizedText)}
                      >
                        <ClipboardCopy className="h-4 w-4 mr-2" />
                        Copy Humanized Text
                      </Button>
                      <DialogClose asChild>
                        <Button variant="ghost" size="sm">Close</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-gray-500">
        <p>Your data is stored only in your browser's local storage, not in a database.</p>
      </CardFooter>
    </Card>
  );
};

export default HumanizationHistory;