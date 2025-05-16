import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  imageSrc, 
  imageAlt
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow border border-gray-100">
      <CardContent className="p-6">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-40 object-cover rounded-lg mb-4" 
        />
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
