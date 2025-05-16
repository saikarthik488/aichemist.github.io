import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { HumanizationOptions } from "@/lib/openai";

interface HumanizationSettingsProps {
  options: HumanizationOptions;
  onChange: (options: Partial<HumanizationOptions>) => void;
}

const HumanizationSettings: React.FC<HumanizationSettingsProps> = ({
  options,
  onChange,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-3">Humanization Level</h3>
        <RadioGroup
          value={options.level}
          onValueChange={(value) => 
            onChange({ level: value as HumanizationOptions['level'] })
          }
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="level-light" />
              <Label htmlFor="level-light">Light</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderate" id="level-moderate" />
              <Label htmlFor="level-moderate">Moderate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="strong" id="level-strong" />
              <Label htmlFor="level-strong">Strong</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-3">Style</h3>
        <Select 
          value={options.style} 
          onValueChange={(value) => 
            onChange({ style: value as HumanizationOptions['style'] })
          }
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

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-3">Additional Options</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="fix-grammar" 
              checked={options.fixGrammar}
              onCheckedChange={(checked) => 
                onChange({ fixGrammar: checked as boolean })
              }
            />
            <label
              htmlFor="fix-grammar"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Fix grammar
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="reorder-sentences" 
              checked={options.reorderSentences}
              onCheckedChange={(checked) => 
                onChange({ reorderSentences: checked as boolean })
              }
            />
            <label
              htmlFor="reorder-sentences"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Reorder sentences
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="add-synonyms" 
              checked={options.addSynonyms}
              onCheckedChange={(checked) => 
                onChange({ addSynonyms: checked as boolean })
              }
            />
            <label
              htmlFor="add-synonyms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Add synonyms
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanizationSettings;
