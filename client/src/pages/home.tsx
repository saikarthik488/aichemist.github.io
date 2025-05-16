import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Wand2, ClipboardCopy, RefreshCw, Award, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import HumanizationSettings from "@/components/HumanizationSettings";
import PlagiarismResults from "@/components/PlagiarismResults";
import AIDetectionResults from "@/components/AIDetectionResults";
import FeatureCard from "@/components/FeatureCard";
import DifferenceViewer from "@/components/DifferenceViewer";
import AdvancedAIDetection from "@/components/AdvancedAIDetection";
import PlayfulLoadingSpinner from "@/components/PlayfulLoadingSpinner";
import AdvancedTextOptions from "@/components/AdvancedTextOptions";
import AchievementsDrawer from "@/components/Achievements";
import AchievementNotification from "@/components/AchievementNotification";

import { HumanizationOptions, humanizeText } from "@/lib/openai";
import HumanizationHistory from "@/components/HumanizationHistory";
import { 
  isAuthenticated, 
  isAdmin, 
  incrementUsage, 
  hasReachedDailyLimit, 
  getRemainingUses 
} from "@/lib/authUtils";
import {
  Achievement,
  processAchievements,
  loadAchievements
} from "@/lib/achievementSystem";

// Define the history entry type
interface HistoryEntry {
  id: string;
  originalText: string;
  humanizedText: string;
  timestamp: number;
}

const Home: React.FC = () => {
  const { toast } = useToast();
  
  // Text Alchemist state
  const [originalText, setOriginalText] = useState("");
  const [humanizedText, setHumanizedText] = useState("");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [humanizationOptions, setHumanizationOptions] = useState<HumanizationOptions>({
    level: "light",
    style: "standard",
    fixGrammar: true,
    reorderSentences: true,
    addSynonyms: false,
    randomnessFactor: 50,
    targetLength: "similar",
    targetReadability: "standard",
    toneAdjustment: "neutral",
    targetAudience: "general",
  });
  
  // Achievement tracking state
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  
  // Load achievements on mount
  useEffect(() => {
    setAchievements(loadAchievements());
  }, []);
  
  // Character count
  const originalCount = originalText.length;
  const humanizedCount = humanizedText.length;
  
  // Mutations
  const humanizeMutation = useMutation({
    mutationFn: () => humanizeText(originalText, humanizationOptions),
    onSuccess: (data) => {
      setHumanizedText(data.humanizedText);
      
      // Save to history in localStorage
      const newEntry: HistoryEntry = {
        id: Date.now().toString(),
        originalText,
        humanizedText: data.humanizedText,
        timestamp: Date.now()
      };
      
      // Get existing history or initialize empty array
      const existingHistory: HistoryEntry[] = JSON.parse(
        localStorage.getItem('humanizationHistory') || '[]'
      );
      
      // Add new entry at the beginning
      const updatedHistory = [newEntry, ...existingHistory];
      
      // Save back to localStorage
      localStorage.setItem('humanizationHistory', JSON.stringify(updatedHistory));
      
      // Process achievements
      const updatedAchievements = processAchievements('humanize_text', {
        aiDetection: data.aiDetection,
        plagiarismScore: data.plagiarismScore,
        options: humanizationOptions
      }, achievements);
      
      // Check if any new achievements were unlocked
      const newlyUnlocked = updatedAchievements.find(achievement => 
        achievement.unlocked && 
        !achievements.find(a => a.id === achievement.id)?.unlocked
      );
      
      if (newlyUnlocked) {
        setUnlockedAchievement(newlyUnlocked);
      }
      
      // Update achievements state
      setAchievements(updatedAchievements);
      
      toast({
        title: "Text humanized successfully",
        description: "Your text has been humanized and saved to history.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error humanizing text",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    },
  });
  
  // Text humanization handler
  const handleHumanizeText = () => {
    if (!originalText) {
      toast({
        title: "No text to humanize",
        description: "Please enter some text to humanize.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if the user has reached their daily limit (if not logged in or not admin)
    if (!isAuthenticated() && !isAdmin() && hasReachedDailyLimit()) {
      toast({
        title: "Daily limit reached",
        description: "Please log in to continue using Text Alchemist or try again tomorrow.",
        variant: "destructive",
      });
      return;
    }
    
    // Increment usage counter for non-logged-in users
    incrementUsage();
    
    // Proceed with text humanization
    humanizeMutation.mutate();
  };
  
  // Copy humanized text to clipboard
  const handleCopyText = () => {
    if (humanizedText) {
      navigator.clipboard.writeText(humanizedText);
      toast({
        title: "Text copied",
        description: "The humanized text has been copied to your clipboard.",
      });
    }
  };
  
  // Reset text fields
  const handleResetText = () => {
    setOriginalText("");
    setHumanizedText("");
  };
  
  // Handler for dismissing unlocked achievement
  const handleDismissAchievement = () => {
    setUnlockedAchievement(null);
  };
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Achievement notification */}
      <AchievementNotification 
        achievement={unlockedAchievement} 
        onClose={handleDismissAchievement} 
      />
      
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI Text Humanizer & Plagiarism Checker
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transform AI-generated text with best-in-class AI detection avoidance and enterprise-grade plagiarism checking
        </p>
      </section>

      {/* Text Humanizer Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">AI Text Humanizer</h2>
          <p className="text-gray-600 mb-4">
            Humanize AI-generated content with best-in-class AI detection avoidance and enterprise-grade plagiarism checking while maintaining quality and coherence.
          </p>
        </div>

        {/* Humanization Settings */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Text Humanization Settings</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            >
              {showAdvancedOptions ? "Basic Options" : "Advanced Options"}
            </Button>
          </div>
          
          {showAdvancedOptions ? (
            <AdvancedTextOptions 
              options={humanizationOptions}
              onChange={(newOptions) => 
                setHumanizationOptions({...humanizationOptions, ...newOptions})
              }
            />
          ) : (
            <HumanizationSettings 
              options={humanizationOptions}
              onChange={(newOptions) => 
                setHumanizationOptions({...humanizationOptions, ...newOptions})
              }
            />
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Original Text
              </label>
              <div className="text-xs text-gray-500">
                <span>{originalCount}</span> / 5000 characters
              </div>
            </div>
            <Textarea
              placeholder="Paste your AI-generated text here..."
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              className="w-full h-64 resize-none"
              maxLength={5000}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Humanized Text
              </label>
              <div className="text-xs text-gray-500">
                <span>{humanizedCount}</span> / 5000 characters
              </div>
            </div>
            <div className="w-full h-64 p-3 border border-gray-300 rounded-md bg-gray-50 overflow-auto">
              {humanizeMutation.isPending ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <PlayfulLoadingSpinner />
                </div>
              ) : humanizedText ? (
                <p>{humanizedText}</p>
              ) : (
                <p className="text-gray-400 italic">
                  Your humanized text will appear here...
                </p>
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500"
                onClick={handleCopyText}
                disabled={!humanizedText || humanizeMutation.isPending}
              >
                <ClipboardCopy className="h-4 w-4 mr-1" />
                <span className="text-sm">Copy Text</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-8">
          <div className="flex justify-center space-x-4 mb-4">
            <Button
              onClick={handleHumanizeText}
              disabled={!originalText || humanizeMutation.isPending || (!isAuthenticated() && !isAdmin() && hasReachedDailyLimit())}
              className="px-6 py-3 bg-primary"
            >
              {humanizeMutation.isPending ? (
                <span className="flex items-center">
                  <LoadingSpinner size="sm" className="mr-2 animate-spin" />
                  Humanizing...
                </span>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-1" /> Humanize Text
                </>
              )}
            </Button>
            <Button 
              onClick={handleResetText}
              disabled={humanizeMutation.isPending}
              variant="outline"
              className="px-6 py-3"
            >
              <RefreshCw className="h-4 w-4 mr-1" /> Reset
            </Button>
            
            <AchievementsDrawer 
              trigger={
                <Button variant="ghost" className="px-6 py-3">
                  <Trophy className="h-4 w-4 mr-1" /> Achievements
                </Button>
              }
            />
          </div>
          
          {/* Usage limit indicator for non-logged in users */}
          {!isAuthenticated() && !isAdmin() && (
            <div className="text-sm text-gray-500 mt-2">
              {hasReachedDailyLimit() ? (
                <p className="text-red-500">
                  Daily limit reached. Please <a href="/auth" className="text-primary hover:underline">log in</a> to continue.
                </p>
              ) : (
                <p>
                  Guest usage: {5 - getRemainingUses()}/5 for today. <a href="/auth" className="text-primary hover:underline">Log in</a> for unlimited usage.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Plagiarism Results */}
        {(humanizedText || humanizeMutation.isPending) && (
          <PlagiarismResults 
            uniqueness={humanizeMutation.data?.plagiarismScore.uniqueness || 98}
            similarity={humanizeMutation.data?.plagiarismScore.similarity || 2}
            loading={humanizeMutation.isPending}
          />
        )}

        {/* AI Detection Results */}
        {(humanizedText || humanizeMutation.isPending) && (
          <AIDetectionResults 
            gptDetector={humanizeMutation.data?.aiDetection.gptDetector || 5}
            zeroGPT={humanizeMutation.data?.aiDetection.zeroGPT || 7}
            contentDetective={humanizeMutation.data?.aiDetection.contentDetective || 3}
            loading={humanizeMutation.isPending}
          />
        )}
        
        {/* Text Difference Viewer */}
        {humanizedText && (
          <DifferenceViewer 
            originalText={originalText}
            humanizedText={humanizedText}
          />
        )}
        
        {/* Humanization History */}
        <HumanizationHistory />
      </div>

      {/* Features Overview */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Features of our AI Text Humanizer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="AI Text Humanization"
            description="Convert AI-generated text to human-like content that can bypass AI detection tools."
            imageSrc="/assets/images/text-humanization.svg"
            imageAlt="Text Humanization"
          />
          <FeatureCard
            title="Plagiarism Checker"
            description="Ensure your humanized content maintains originality with our built-in plagiarism detection."
            imageSrc="/assets/images/plagiarism-checker.svg"
            imageAlt="Plagiarism Checker"
          />
          <FeatureCard
            title="AI Detection Avoidance"
            description="Our technology helps your content pass through AI detection systems undetected."
            imageSrc="/assets/images/ai-detection.svg"
            imageAlt="AI Detection Avoidance"
          />
          <FeatureCard
            title="Advanced Text Options"
            description="Fine-tune your text with advanced options like readability adjustment, tone control, and targeted audience settings."
            imageSrc="/assets/images/advanced-options.svg"
            imageAlt="Advanced Options"
          />
          <FeatureCard
            title="Achievement System"
            description="Earn rewards and track your progress through our gamified achievement system as you use Text Alchemist."
            imageSrc="/assets/images/achievements.svg"
            imageAlt="Achievement System"
          />
          <FeatureCard
            title="Visual Difference Analysis"
            description="See exactly what changed between your original and humanized text with our visual comparison tool."
            imageSrc="/assets/images/difference-viewer.svg"
            imageAlt="Difference Viewer"
          />
        </div>
      </section>
    </main>
  );
};

export default Home;