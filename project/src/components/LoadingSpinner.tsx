import React from 'react';
import { Brain, Eye, Zap } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
        <div className="text-center space-y-6">
          {/* Animated Icons */}
          <div className="flex justify-center space-x-4">
            <div className="animate-bounce" style={{ animationDelay: '0ms' }}>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '150ms' }}>
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-full">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="animate-bounce" style={{ animationDelay: '300ms' }}>
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Analyzing Image</h3>
            <p className="text-gray-400">Our AI is processing your image...</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full animate-pulse"></div>
          </div>

          {/* Loading Steps */}
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Detecting objects and scenes</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '500ms' }}></div>
              <span>Generating descriptions and tags</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '1000ms' }}></div>
              <span>Extracting text content</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;