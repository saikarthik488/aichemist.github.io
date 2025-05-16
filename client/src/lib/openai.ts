import { apiRequest } from "@/lib/queryClient";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user

// OpenAI Config for Text Humanization
export interface HumanizationOptions {
  level: 'light' | 'moderate' | 'strong';
  style: 'standard' | 'academic' | 'creative' | 'professional' | 'casual';
  fixGrammar: boolean;
  reorderSentences: boolean;
  addSynonyms: boolean;
  
  // Advanced options
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

export interface HumanizationResponse {
  humanizedText: string;
  plagiarismScore: {
    uniqueness: number;
    similarity: number;
  };
  aiDetection: {
    gptDetector: number;
    zeroGPT: number;
    contentDetective: number;
  };
}

export async function humanizeText(
  text: string, 
  options: HumanizationOptions
): Promise<HumanizationResponse> {
  try {
    const response = await apiRequest('POST', '/api/humanize', {
      text,
      options
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error humanizing text:', error);
    throw error;
  }
}
