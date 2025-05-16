// Achievement System for Text Alchemist

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  dateUnlocked?: Date;
}

// Achievement IDs
export const ACHIEVEMENTS = {
  FIRST_HUMANIZE: 'first_humanize',
  POWER_USER: 'power_user',
  AI_MASTER: 'ai_master',
  PERFECT_SCORE: 'perfect_score',
  TEXT_WIZARD: 'text_wizard'
};

// Default achievements
export const defaultAchievements: Achievement[] = [
  {
    id: ACHIEVEMENTS.FIRST_HUMANIZE,
    name: 'First Transformation',
    description: 'Humanize your first text',
    icon: 'Wand2',
    unlocked: false,
  },
  {
    id: ACHIEVEMENTS.POWER_USER,
    name: 'Power User',
    description: 'Humanize 10 texts',
    icon: 'Zap',
    unlocked: false,
    progress: 0,
    maxProgress: 10
  },
  {
    id: ACHIEVEMENTS.AI_MASTER,
    name: 'AI Detection Master',
    description: 'Get a score below 1% on any AI detection tool',
    icon: 'Shield',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.PERFECT_SCORE,
    name: 'Perfect Score',
    description: 'Get 100% uniqueness on a text humanization',
    icon: 'Award',
    unlocked: false
  },
  {
    id: ACHIEVEMENTS.TEXT_WIZARD,
    name: 'Text Wizard',
    description: 'Use all humanization options in a single session',
    icon: 'Sparkles',
    unlocked: false,
    progress: 0,
    maxProgress: 5
  }
];

// Save achievements to localStorage
export function saveAchievements(achievements: Achievement[]): void {
  localStorage.setItem('textAlchemistAchievements', JSON.stringify(achievements));
}

// Load achievements from localStorage
export function loadAchievements(): Achievement[] {
  const saved = localStorage.getItem('textAlchemistAchievements');
  if (!saved) {
    saveAchievements(defaultAchievements);
    return defaultAchievements;
  }
  
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse achievements:', e);
    return defaultAchievements;
  }
}

// Unlock an achievement
export function unlockAchievement(id: string, achievements: Achievement[] = loadAchievements()): Achievement[] {
  const updatedAchievements = achievements.map(achievement => {
    if (achievement.id === id && !achievement.unlocked) {
      return {
        ...achievement,
        unlocked: true,
        dateUnlocked: new Date()
      };
    }
    return achievement;
  });
  
  saveAchievements(updatedAchievements);
  return updatedAchievements;
}

// Increment progress on an achievement
export function incrementAchievementProgress(id: string, amount: number = 1, achievements: Achievement[] = loadAchievements()): Achievement[] {
  const updatedAchievements = achievements.map(achievement => {
    if (achievement.id === id && !achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress !== undefined) {
      const newProgress = Math.min(achievement.progress + amount, achievement.maxProgress);
      const newUnlocked = newProgress >= achievement.maxProgress;
      
      return {
        ...achievement,
        progress: newProgress,
        unlocked: newUnlocked,
        dateUnlocked: newUnlocked ? new Date() : undefined
      };
    }
    return achievement;
  });
  
  saveAchievements(updatedAchievements);
  return updatedAchievements;
}

// Check and process achievements based on user actions
export function processAchievements(action: string, data: any = {}, achievements: Achievement[] = loadAchievements()): Achievement[] {
  let updatedAchievements = [...achievements];
  
  switch (action) {
    case 'humanize_text':
      // Check if this is the first humanization
      const firstHumanizeAchievement = updatedAchievements.find(a => a.id === ACHIEVEMENTS.FIRST_HUMANIZE);
      if (firstHumanizeAchievement && !firstHumanizeAchievement.unlocked) {
        updatedAchievements = unlockAchievement(ACHIEVEMENTS.FIRST_HUMANIZE, updatedAchievements);
      }
      
      // Increment the power user achievement
      updatedAchievements = incrementAchievementProgress(ACHIEVEMENTS.POWER_USER, 1, updatedAchievements);
      
      // Check AI detection scores
      if (data.aiDetection) {
        const lowestScore = Math.min(
          data.aiDetection.gptDetector || 100,
          data.aiDetection.zeroGPT || 100,
          data.aiDetection.contentDetective || 100
        );
        
        if (lowestScore <= 1) {
          updatedAchievements = unlockAchievement(ACHIEVEMENTS.AI_MASTER, updatedAchievements);
        }
      }
      
      // Check plagiarism scores
      if (data.plagiarismScore && data.plagiarismScore.uniqueness >= 99) {
        updatedAchievements = unlockAchievement(ACHIEVEMENTS.PERFECT_SCORE, updatedAchievements);
      }
      
      break;
      
    case 'use_option':
      // Track usage of different humanization options
      updatedAchievements = incrementAchievementProgress(ACHIEVEMENTS.TEXT_WIZARD, 1, updatedAchievements);
      break;
  }
  
  return updatedAchievements;
}