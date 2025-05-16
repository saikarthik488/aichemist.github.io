import React, { useState, useEffect } from "react";
import { loadAchievements, Achievement } from "@/lib/achievementSystem";
import { 
  Wand2, 
  Zap, 
  Shield, 
  Award, 
  Sparkles,
  Lock,
  CheckCircle2
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AchievementCardProps {
  achievement: Achievement;
}

// Map of achievement icons
const achievementIcons = {
  'Wand2': Wand2,
  'Zap': Zap,
  'Shield': Shield,
  'Award': Award,
  'Sparkles': Sparkles,
};

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
  // Dynamically select the icon component
  const IconComponent = achievementIcons[achievement.icon as keyof typeof achievementIcons] || Wand2;
  
  return (
    <div className={`rounded-lg p-4 flex items-start gap-4 mb-4 transition-all ${
      achievement.unlocked 
        ? 'bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200' 
        : 'bg-gray-100 border border-gray-200'
    }`}>
      <div className={`p-2 rounded-full ${
        achievement.unlocked ? 'bg-amber-200 text-amber-700' : 'bg-gray-200 text-gray-500'
      }`}>
        <IconComponent className="h-6 w-6" />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{achievement.name}</h3>
            <p className="text-sm text-gray-600">{achievement.description}</p>
          </div>
          
          {achievement.unlocked ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Unlocked
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
              <Lock className="h-3 w-3 mr-1" /> Locked
            </Badge>
          )}
        </div>
        
        {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{achievement.progress}/{achievement.maxProgress}</span>
            </div>
            <Progress 
              value={(achievement.progress / achievement.maxProgress) * 100} 
              className={achievement.unlocked ? "bg-amber-100" : "bg-gray-200"}
            />
          </div>
        )}
        
        {achievement.unlocked && achievement.dateUnlocked && (
          <p className="text-xs text-gray-500 mt-2">
            Unlocked: {new Date(achievement.dateUnlocked).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

interface AchievementsDrawerProps {
  trigger?: React.ReactNode;
}

const AchievementsDrawer: React.FC<AchievementsDrawerProps> = ({ trigger }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // Load achievements when the component mounts or the drawer opens
    if (open) {
      setAchievements(loadAchievements());
    }
  }, [open]);
  
  // Calculate stats
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);
  
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Award className="h-4 w-4" />
            Achievements
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <div className="max-w-md mx-auto">
          <DrawerHeader>
            <DrawerTitle>Your Achievements</DrawerTitle>
            <DrawerDescription>
              Track your progress and earn rewards as you use Text Alchemist
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Completion</span>
                <span className="text-sm text-gray-500">{unlockedCount}/{totalCount}</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <AchievementCard 
                  key={achievement.id} 
                  achievement={achievement} 
                />
              ))}
            </div>
          </div>
          
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AchievementsDrawer;