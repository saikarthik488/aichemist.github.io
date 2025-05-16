import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wand2, 
  FileText, 
  Eye, 
  Search, 
  FileCheck, 
  Combine, 
  Scissors, 
  FileOutput,
  Shield,
  Lock,
  Library,
  Zap
} from "lucide-react";

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Features</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Text Alchemist offers a comprehensive suite of tools 
          for AI text humanization and plagiarism checking
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Text Alchemist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-primary" />
                AI Text Humanization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Transform AI-generated content to appear human-written with our
                advanced paraphrasing technology.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Eye className="h-5 w-5 mr-2 text-primary" />
                AI Detection Avoidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Best-in-class AI detection avoidance that bypasses AI content detectors 
                like GPT Detector, ZeroGPT, and Content Detective with humanized text.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-primary" />
                Plagiarism Detection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Verify the uniqueness of your humanized content with our 
                built-in plagiarism checker.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Library className="h-5 w-5 mr-2 text-primary" />
                Multiple Writing Styles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Choose from various writing styles: academic, creative, 
                professional, casual, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Adjustable Humanization Levels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Control the intensity of humanization with light, moderate, 
                or strong options to suit your needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Content Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We never store your content or use it for training. Your 
                text is processed securely and then discarded.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  );
};

export default Features;
