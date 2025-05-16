import React, { useState, useEffect } from "react";
import { Achievement } from "@/lib/achievementSystem";
import { 
  Wand2, 
  Zap, 
  Shield, 
  Award, 
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from 'canvas-confetti';

interface AchievementNotificationProps {
  achievement: Achievement | null;
  onClose: () => void;
}

// Map of achievement icons
const achievementIcons = {
  'Wand2': Wand2,
  'Zap': Zap,
  'Shield': Shield,
  'Award': Award,
  'Sparkles': Sparkles,
};

const AchievementNotification: React.FC<AchievementNotificationProps> = ({ 
  achievement, 
  onClose 
}) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // Show notification when achievement changes
    if (achievement) {
      setVisible(true);
      
      // Trigger confetti when achievement is unlocked
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF8C00']
      });
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 500); // Allow exit animation to complete
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);
  
  if (!achievement) return null;
  
  const IconComponent = achievementIcons[achievement.icon as keyof typeof achievementIcons] || Award;
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full"
        >
          <div className="bg-gradient-to-r from-amber-50 to-yellow-100 border border-amber-200 shadow-lg rounded-lg p-5 mx-4">
            <div className="flex items-start">
              <div className="bg-amber-200 text-amber-700 p-3 rounded-full mr-4 flex-shrink-0">
                <IconComponent className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900">Achievement Unlocked!</h3>
                <h4 className="text-amber-800 font-medium">{achievement.name}</h4>
                <p className="text-amber-700 text-sm mt-1">{achievement.description}</p>
              </div>
              
              <button 
                onClick={() => {
                  setVisible(false);
                  setTimeout(onClose, 300);
                }} 
                className="text-amber-500 hover:text-amber-700 transition-colors"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Dismiss</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementNotification;