import React from "react";
import { Link } from "wouter";
import { 
  Wand2, 
  Twitter, 
  Facebook, 
  Instagram, 
  Github 
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Wand2 className="h-5 w-5 mr-2" />
              Text Alchemist
            </h3>
            <p className="text-gray-400 text-sm">
              The ultimate platform for AI text humanization with plagiarism checking capabilities.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/features"><div className="hover:text-white cursor-pointer">Features</div></Link></li>
              <li><Link href="/pricing"><div className="hover:text-white cursor-pointer">Pricing</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">API</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Enterprise</div></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Documentation</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Blog</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Tutorials</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Community</div></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#"><div className="hover:text-white cursor-pointer">About</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Careers</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Privacy</div></Link></li>
              <li><Link href="#"><div className="hover:text-white cursor-pointer">Terms</div></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Text Alchemist. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Facebook className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-5 w-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Github className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
