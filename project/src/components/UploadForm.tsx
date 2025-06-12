import React, { useState, useRef } from 'react';
import { Upload, Link, Image as ImageIcon } from 'lucide-react';

interface UploadFormProps {
  onImageSubmit: (file: File | null, url: string) => void;
  isLoading: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onImageSubmit, isLoading }) => {
  const [dragOver, setDragOver] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSubmit(file, '');
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageSubmit(file, '');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      onImageSubmit(null, imageUrl.trim());
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
        {/* Tab Header */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'upload'
                ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Upload className="h-4 w-4 inline mr-2" />
            Upload File
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'url'
                ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Link className="h-4 w-4 inline mr-2" />
            Image URL
          </button>
        </div>

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div className="p-8">
            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                dragOver
                  ? 'border-purple-400 bg-purple-500/10'
                  : 'border-gray-600 hover:border-gray-500 hover:bg-white/5'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <ImageIcon className="h-10 w-10 text-purple-400" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-2">Drop your image here</h3>
                  <p className="text-gray-400 mb-4">or click to browse files</p>
                  <p className="text-sm text-gray-500">Supports JPG, PNG, GIF, WebP</p>
                </div>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  Choose File
                </button>
              </div>
            </div>
          </div>
        )}

        {/* URL Tab */}
        {activeTab === 'url' && (
          <div className="p-8">
            <form onSubmit={handleUrlSubmit} className="space-y-6">
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400 transition-all"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !imageUrl.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                Analyze Image
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadForm;