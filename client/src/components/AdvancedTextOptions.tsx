import React from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HumanizationOptions } from "@/lib/openai";
import { 
  Wand2, 
  Type, 
  Languages, 
  Highlighter, 
  Dices, 
  Settings2, 
  Info,
  Edit2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdvancedTextOptionsProps {
  options: HumanizationOptions;
  onChange: (options: Partial<HumanizationOptions>) => void;
}

// Extended humanization options with new capabilities
export interface ExtendedHumanizationOptions extends HumanizationOptions {
  targetReadability?: 'simple' | 'standard' | 'academic';
  targetLength?: 'shorter' | 'similar' | 'longer';
  preserveKeyPhrases?: string[];
  toneAdjustment?: 'neutral' | 'formal' | 'casual' | 'persuasive' | 'enthusiastic';
  randomnessFactor?: number; // 0-100
  preferredSynonyms?: string[];
  avoidedWords?: string[];
  sentenceComplexityReduction?: boolean;
  convertPassiveToActive?: boolean;
  targetAudience?: 'general' | 'technical' | 'business' | 'academic' | 'casual';
}

const AdvancedTextOptions: React.FC<AdvancedTextOptionsProps> = ({ 
  options, 
  onChange 
}) => {
  // Handle extended options with default
  const extendedOptions = options as ExtendedHumanizationOptions;
  
  // Update a specific option
  const updateOption = <K extends keyof ExtendedHumanizationOptions>(
    key: K, 
    value: ExtendedHumanizationOptions[K]
  ) => {
    onChange({ ...options, [key]: value });
  };
  
  // Convert string arrays (comma separated) to actual arrays
  const handleStringArrayChange = (
    key: keyof Pick<ExtendedHumanizationOptions, 'preserveKeyPhrases' | 'preferredSynonyms' | 'avoidedWords'>,
    value: string
  ) => {
    // Split by commas and trim whitespace
    const array = value.split(',').map(item => item.trim()).filter(Boolean);
    updateOption(key, array as any);
  };
  
  // Get string representation of arrays for inputs
  const getStringFromArray = (array: string[] | undefined): string => {
    return array ? array.join(', ') : '';
  };
  
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="basic" className="flex items-center gap-1.5">
          <Wand2 className="h-4 w-4" />
          <span className="hidden sm:inline">Basic</span>
        </TabsTrigger>
        <TabsTrigger value="advanced" className="flex items-center gap-1.5">
          <Settings2 className="h-4 w-4" />
          <span className="hidden sm:inline">Advanced</span>
        </TabsTrigger>
        <TabsTrigger value="language" className="flex items-center gap-1.5">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">Language</span>
        </TabsTrigger>
        <TabsTrigger value="targeting" className="flex items-center gap-1.5">
          <Highlighter className="h-4 w-4" />
          <span className="hidden sm:inline">Targeting</span>
        </TabsTrigger>
      </TabsList>
      
      {/* Basic Options Tab */}
      <TabsContent value="basic" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Humanization Strength</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Info className="h-3.5 w-3.5" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Controls how aggressively the text is transformed. Higher values make it less detectable by AI but might alter meaning.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={options.level}
              onValueChange={(value) => updateOption('level', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select strength" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="strong">Strong</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Writing Style</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5">
                      <Info className="h-3.5 w-3.5" />
                      <span className="sr-only">Info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">Adjusts the overall style of writing to match different contexts.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Select
              value={options.style}
              onValueChange={(value) => updateOption('style', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="creative">Creative</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="fix-grammar">Fix Grammar</Label>
              <p className="text-xs text-gray-500">Corrects grammatical errors in the text</p>
            </div>
            <Switch 
              id="fix-grammar" 
              checked={options.fixGrammar}
              onCheckedChange={(checked) => updateOption('fixGrammar', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="reorder-sentences">Reorder Sentences</Label>
              <p className="text-xs text-gray-500">Changes sentence order when possible</p>
            </div>
            <Switch 
              id="reorder-sentences" 
              checked={options.reorderSentences}
              onCheckedChange={(checked) => updateOption('reorderSentences', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="add-synonyms">Replace with Synonyms</Label>
              <p className="text-xs text-gray-500">Substitutes words with synonyms</p>
            </div>
            <Switch 
              id="add-synonyms" 
              checked={options.addSynonyms}
              onCheckedChange={(checked) => updateOption('addSynonyms', checked)}
            />
          </div>
        </div>
      </TabsContent>
      
      {/* Advanced Options Tab */}
      <TabsContent value="advanced" className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Randomness Factor</Label>
              <span className="text-xs text-gray-500">{extendedOptions.randomnessFactor || 50}%</span>
            </div>
            <Slider 
              value={[extendedOptions.randomnessFactor || 50]} 
              min={0} 
              max={100} 
              step={1}
              onValueChange={(values) => updateOption('randomnessFactor', values[0])}
            />
            <p className="text-xs text-gray-500">Higher values introduce more unpredictable changes.</p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Target Length</Label>
              <Select
                value={extendedOptions.targetLength || 'similar'}
                onValueChange={(value) => updateOption('targetLength', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose target length" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shorter">Shorter</SelectItem>
                  <SelectItem value="similar">Similar Length</SelectItem>
                  <SelectItem value="longer">Longer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Tone Adjustment</Label>
              <Select
                value={extendedOptions.toneAdjustment || 'neutral'}
                onValueChange={(value) => updateOption('toneAdjustment', value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="persuasive">Persuasive</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="sentence-complexity">Reduce Sentence Complexity</Label>
                <p className="text-xs text-gray-500">Simplifies complex sentences</p>
              </div>
              <Switch 
                id="sentence-complexity" 
                checked={extendedOptions.sentenceComplexityReduction || false}
                onCheckedChange={(checked) => updateOption('sentenceComplexityReduction', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <Label htmlFor="passive-active">Convert Passive to Active Voice</Label>
                <p className="text-xs text-gray-500">Changes passive sentences to active voice</p>
              </div>
              <Switch 
                id="passive-active" 
                checked={extendedOptions.convertPassiveToActive || false}
                onCheckedChange={(checked) => updateOption('convertPassiveToActive', checked)}
              />
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Language Tab */}
      <TabsContent value="language" className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Preferred Synonyms</Label>
            <Textarea 
              placeholder="Enter preferred words separated by commas" 
              value={getStringFromArray(extendedOptions.preferredSynonyms)}
              onChange={(e) => handleStringArrayChange('preferredSynonyms', e.target.value)}
              rows={2}
            />
            <p className="text-xs text-gray-500">Words to prioritize when replacing with synonyms.</p>
          </div>
          
          <div className="space-y-2">
            <Label>Avoided Words</Label>
            <Textarea 
              placeholder="Enter words to avoid, separated by commas" 
              value={getStringFromArray(extendedOptions.avoidedWords)}
              onChange={(e) => handleStringArrayChange('avoidedWords', e.target.value)}
              rows={2}
            />
            <p className="text-xs text-gray-500">Words that should not appear in the output.</p>
          </div>
          
          <div className="space-y-2">
            <Label>Readability Level</Label>
            <Select
              value={extendedOptions.targetReadability || 'standard'}
              onValueChange={(value) => updateOption('targetReadability', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select readability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Adjusts vocabulary complexity and sentence structure.</p>
          </div>
        </div>
      </TabsContent>
      
      {/* Targeting Tab */}
      <TabsContent value="targeting" className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Target Audience</Label>
            <Select
              value={extendedOptions.targetAudience || 'general'}
              onValueChange={(value) => updateOption('targetAudience', value as any)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select target audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Adapts language to resonate with specific audiences.</p>
          </div>
          
          <div className="space-y-2">
            <Label>Preserve Key Phrases</Label>
            <Textarea 
              placeholder="Enter phrases to preserve exactly, separated by commas" 
              value={getStringFromArray(extendedOptions.preserveKeyPhrases)}
              onChange={(e) => handleStringArrayChange('preserveKeyPhrases', e.target.value)}
              rows={2}
            />
            <p className="text-xs text-gray-500">Important phrases that should remain unchanged.</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdvancedTextOptions;