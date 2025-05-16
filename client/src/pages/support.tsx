import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react";

const Support: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">How Can We Help?</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions or reach out to our support team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <HelpCircle className="h-6 w-6 mr-2 text-primary" />
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the AI text humanizer work?</AccordionTrigger>
              <AccordionContent>
                Our AI text humanizer uses advanced natural language processing algorithms to rephrase 
                and restructure AI-generated text. It adds human-like variations, adjusts sentence 
                structures, and incorporates natural language patterns to help your content bypass 
                AI detection tools while maintaining its original meaning.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>What file formats are supported for conversion?</AccordionTrigger>
              <AccordionContent>
                We support a wide range of file formats including PDF, DOCX, DOC, XLSX, XLS, PPT, PPTX, 
                JPG, PNG, TXT, and many more. Our universal converter can handle most common document and 
                image formats to meet your conversion needs.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>Is my content secure and private?</AccordionTrigger>
              <AccordionContent>
                Yes, we take your privacy seriously. All text and files processed through our platform 
                are not stored permanently. Your content is temporarily processed in a secure environment 
                and automatically deleted after processing. We do not use your content for training our 
                AI models or share it with third parties.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What are the limitations of the free plan?</AccordionTrigger>
              <AccordionContent>
                The free plan allows you to humanize up to 100 characters of text per day and perform 
                5 file conversions per month. File size is limited to 5MB. For increased capacity and 
                additional features, consider upgrading to one of our premium plans.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How accurate is the plagiarism checker?</AccordionTrigger>
              <AccordionContent>
                Our plagiarism checker compares your content against billions of web pages, academic 
                papers, and publications to identify potential matches. While it's highly accurate, 
                no plagiarism checker can guarantee 100% accuracy. We recommend using it as a guide 
                and always properly citing your sources.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I merge multiple PDF files?</AccordionTrigger>
              <AccordionContent>
                Yes, our File Forge tool allows you to merge multiple PDF files into a single document. 
                You can also arrange the order of pages, add or remove specific pages, and perform other 
                PDF editing operations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageSquare className="h-6 w-6 mr-2 text-primary" />
            Contact Us
          </h2>
          
          <Card>
            <CardContent className="pt-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your issue or question in detail..."
                    rows={5}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6 flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">Email Support</h3>
                  <p className="text-sm text-gray-600">
                    support@textalchemist.com
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    We respond within 24 hours
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">Phone Support</h3>
                  <p className="text-sm text-gray-600">
                    +1 (555) 123-4567
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Mon-Fri, 9AM-5PM ET
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
