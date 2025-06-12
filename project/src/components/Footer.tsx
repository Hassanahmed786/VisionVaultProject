import React from 'react';
import { ExternalLink, Github, Linkedin, Mail, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const handlePortfolioClick = () => {
    // Replace with your actual portfolio URL
    window.open('https://your-portfolio-website.com', '_blank');
  };

  return (
    <footer className="mt-16 border-t border-white/10 bg-black/20 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Main Content */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Built with ❤️ Shaik Hassan Ahmed
            </h3>
            <p className="text-gray-400 text-sm max-w-md">
              Full-Stack Developer passionate about AI, Computer Vision, and creating beautiful web experiences
            </p>
          </div>

          {/* Interactive Portfolio Link */}
          <div 
            onClick={handlePortfolioClick}
            className="group relative cursor-pointer"
          >
            <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
              <Code className="h-4 w-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <span className="text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                Developer Portfolio
              </span>
              <ExternalLink className="h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
            
            {/* Hover Tooltip */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg border border-gray-700 whitespace-nowrap">
                Want to view more of my work and connect? Click here!
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>

          {/* Social Links (Optional) */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Hassanahmed786"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/hassan-ahmed-3b5ba5283/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:ahmedshaikhassan@gmail.com"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              aria-label="Email Contact"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center pt-4 border-t border-white/5 w-full">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Shaik Hassan Ahmed. All rights reserved. | VisionVault - Smart Image Analysis
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;