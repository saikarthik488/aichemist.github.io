import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PricingTier: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}> = ({ title, price, description, features, buttonText, popular = false }) => {
  return (
    <Card className={`flex flex-col ${popular ? 'border-primary shadow-lg' : 'border-gray-200'}`}>
      {popular && (
        <div className="bg-primary text-white text-xs text-center font-medium py-1 rounded-t-lg">
          MOST POPULAR
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Free" && <span className="text-gray-500 ml-1">/month</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${popular ? 'bg-primary' : 'bg-gray-800'}`}
          variant={popular ? "default" : "secondary"}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the plan that's right for you and start transforming your text and files today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <PricingTier
          title="Free"
          price="Free"
          description="Basic features for personal use"
          features={[
            "100 characters of text humanization per day",
            "5 file conversions per month",
            "Max file size: 5MB",
            "Standard support",
            "Basic AI detection avoidance",
            "Basic plagiarism checking"
          ]}
          buttonText="Get Started"
        />
        <PricingTier
          title="Professional"
          price="$19.99"
          description="Perfect for freelancers and professionals"
          features={[
            "10,000 characters of text humanization per day",
            "100 file conversions per month",
            "Max file size: 50MB",
            "Priority support",
            "Advanced AI detection avoidance",
            "Comprehensive plagiarism checking",
            "All file tools included"
          ]}
          buttonText="Subscribe Now"
          popular={true}
        />
        <PricingTier
          title="Enterprise"
          price="$49.99"
          description="For teams and businesses with high volume needs"
          features={[
            "Unlimited text humanization",
            "Unlimited file conversions",
            "Max file size: 200MB",
            "24/7 dedicated support",
            "Best-in-class AI detection avoidance",
            "Enterprise-grade plagiarism checking",
            "All file tools included",
            "API access for integration"
          ]}
          buttonText="Contact Sales"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Contact us for custom enterprise pricing and features tailored to your organization's needs.
        </p>
        <Button size="lg" variant="outline">
          Contact Our Sales Team
        </Button>
      </div>
    </div>
  );
};

export default Pricing;
