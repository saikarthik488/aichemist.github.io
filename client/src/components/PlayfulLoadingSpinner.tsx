import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Sparkles, Zap, Brain, Stars, Sigma, Italic, BrainCircuit } from 'lucide-react';

interface PlayfulLoadingSpinnerProps {
  text?: string;
}

interface AnimatedIconProps {
  rotation?: number;
  scale?: number;
  y?: number;
  duration?: number;
}

// Fun loading messages for the humanization process
const loadingMessages = [
  "Reformulating your text...",
  "Adding human touches...",
  "Bypassing AI detection...",
  "Analyzing writing patterns...",
  "Adjusting linguistic markers...",
  "Applying semantic variations...",
  "Reworking sentence structures...",
  "Injecting stylistic elements...",
  "Enhancing human-like qualities...",
  "Optimizing language patterns...",
  "Randomizing word selection..."
];

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  rotation = 360, 
  scale = [0.8, 1.2, 0.8], 
  y = [-3, 3, -3],
  duration = 1.5 
}) => {
  // List of icons to animate
  const icons = [
    Wand2, Sparkles, Zap, Brain, Stars, Sigma, Italic, BrainCircuit
  ];
  
  // Choose a random icon
  const randomIndex = Math.floor(Math.random() * icons.length);
  const Icon = icons[randomIndex];
  
  return (
    <motion.div
      animate={{
        rotate: rotation,
        scale: scale as any, // Type casting to avoid TS errors
        y: y as any // Type casting to avoid TS errors
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="inline-block"
    >
      <Icon className="h-5 w-5 text-primary" />
    </motion.div>
  );
};

const PlayfulLoadingSpinner: React.FC<PlayfulLoadingSpinnerProps> = ({ text }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Change the message every 2.5 seconds with a fade effect
    const messageTimer = setInterval(() => {
      setIsVisible(false);
      
      // After fade out, change the message and fade in
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        setIsVisible(true);
      }, 500);
    }, 3000);
    
    return () => clearInterval(messageTimer);
  }, []);
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 mb-3">
        {/* Multiple animated icons with different animation settings */}
        <AnimatedIcon 
          rotation={360} 
          scale={[0.8, 1.2, 0.8] as any} 
          y={[-3, 3, -3] as any} 
          duration={1.5} 
        />
        <AnimatedIcon 
          rotation={-360} 
          scale={[1.2, 0.8, 1.2] as any} 
          y={[3, -3, 3] as any} 
          duration={2} 
        />
        <AnimatedIcon 
          rotation={180} 
          scale={[0.9, 1.1, 0.9] as any} 
          y={[-2, 2, -2] as any} 
          duration={1.8} 
        />
        <AnimatedIcon 
          rotation={-180} 
          scale={[1.1, 0.9, 1.1] as any} 
          y={[2, -2, 2] as any} 
          duration={2.2} 
        />
      </div>
      
      <div className="min-h-[24px]">
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-sm font-medium text-gray-600">
                {text || loadingMessages[currentMessageIndex]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlayfulLoadingSpinner;