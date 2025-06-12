import React, { useState } from 'react';
import { Eye, Database, Zap } from 'lucide-react';
import UploadForm from './components/UploadForm';
import ImageDisplay from './components/ImageDisplay';
import ResultsPanel from './components/ResultsPanel';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';

interface AnalysisResult {
  analysis: any;
  ocr: any;
}

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageAnalysis = async (imageFile: File | null, imageUrl: string) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const formData = new FormData();
      
      if (imageFile) {
        formData.append('image', imageFile);
        setImage(URL.createObjectURL(imageFile));
      } else if (imageUrl) {
        formData.append('imageUrl', imageUrl);
        setImage(imageUrl);
      }

      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                VisionVault
              </h1>
              <p className="text-sm text-gray-400">Smart Image Insight Web App</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Features Overview */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            AI-Powered Image Analysis
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload an image or provide a URL to extract insights using advanced computer vision technology
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
              <Database className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Object Detection</h3>
              <p className="text-gray-400 text-sm">Identify and locate objects with precise bounding boxes</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
              <Eye className="h-12 w-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Smart Captions</h3>
              <p className="text-gray-400 text-sm">Generate descriptive captions and extract meaningful tags</p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
              <Zap className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">OCR Text</h3>
              <p className="text-gray-400 text-sm">Extract and recognize text content from images</p>
            </div>
          </div>
        </div>

        {/* Upload Form */}
        {!image && (
          <div className="mb-8">
            <UploadForm onImageSubmit={handleImageAnalysis} isLoading={isLoading} />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-8">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-8 p-6 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-lg">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Analysis Failed</h3>
            <p className="text-red-300">{error}</p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {image && results && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImageDisplay 
              imageUrl={image} 
              objects={results.analysis.objects || []} 
              onReset={handleReset}
            />
            <ResultsPanel 
              results={results} 
              onDownload={() => {
                const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'vision-analysis-results.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;