import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Tags, 
  MessageSquare, 
  Eye,
  ChevronDown,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';

interface ResultsPanelProps {
  results: {
    analysis: any;
    ocr: any;
  };
  onDownload: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ results, onDownload }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ocr' | 'raw'>('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['description']);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const extractOcrText = (ocrData: any): string => {
    if (!ocrData?.regions) return '';
    
    return ocrData.regions
      .flatMap((region: any) => 
        region.lines?.flatMap((line: any) =>
          line.words?.map((word: any) => word.text).join(' ')
        ) || []
      )
      .join('\n');
  };

  const ocrText = extractOcrText(results.ocr);

  return (
    <div className="space-y-6">
      {/* Header with Download */}
      <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
        <h2 className="text-xl font-bold text-purple-400">Analysis Results</h2>
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-lg font-medium transition-all transform hover:scale-105"
        >
          <Download className="h-4 w-4" />
          <span>Download JSON</span>
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Eye className="h-4 w-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'ocr'
                ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="h-4 w-4 inline mr-2" />
            Text (OCR)
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === 'raw'
                ? 'bg-purple-500/20 text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <MessageSquare className="h-4 w-4 inline mr-2" />
            Raw Data
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description Section */}
              <div>
                <button
                  onClick={() => toggleSection('description')}
                  className="flex items-center justify-between w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    <span className="font-semibold">Image Description</span>
                  </div>
                  {expandedSections.includes('description') ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </button>
                
                {expandedSections.includes('description') && (
                  <div className="mt-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    {results.analysis.description?.captions?.map((caption: any, index: number) => (
                      <div key={index} className="mb-2">
                        <p className="text-gray-300">{caption.text}</p>
                        <p className="text-sm text-gray-500">
                          Confidence: {Math.round(caption.confidence * 100)}%
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tags Section */}
              <div>
                <button
                  onClick={() => toggleSection('tags')}
                  className="flex items-center justify-between w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Tags className="h-5 w-5 text-green-400" />
                    <span className="font-semibold">Tags ({results.analysis.tags?.length || 0})</span>
                  </div>
                  {expandedSections.includes('tags') ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </button>
                
                {expandedSections.includes('tags') && (
                  <div className="mt-3 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                    <div className="flex flex-wrap gap-2">
                      {results.analysis.tags?.map((tag: any, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-medium"
                        >
                          {tag.name} ({Math.round(tag.confidence * 100)}%)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Objects Section */}
              <div>
                <button
                  onClick={() => toggleSection('objects')}
                  className="flex items-center justify-between w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-purple-400" />
                    <span className="font-semibold">Objects ({results.analysis.objects?.length || 0})</span>
                  </div>
                  {expandedSections.includes('objects') ? 
                    <ChevronDown className="h-4 w-4" /> : 
                    <ChevronRight className="h-4 w-4" />
                  }
                </button>
                
                {expandedSections.includes('objects') && (
                  <div className="mt-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <div className="space-y-2">
                      {results.analysis.objects?.map((obj: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded">
                          <span className="font-medium">{obj.object}</span>
                          <span className="text-sm text-gray-400">
                            {Math.round(obj.confidence * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OCR Tab */}
          {activeTab === 'ocr' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-orange-400">Extracted Text</h3>
                {ocrText && (
                  <button
                    onClick={() => copyToClipboard(ocrText, 'ocr')}
                    className="flex items-center space-x-2 px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg text-sm transition-colors"
                  >
                    {copiedText === 'ocr' ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Text</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              
              {ocrText ? (
                <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20 max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-gray-300 text-sm leading-relaxed">
                    {ocrText}
                  </pre>
                </div>
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No text detected in this image</p>
                </div>
              )}

              {/* OCR Language Info */}
              {results.ocr.language && (
                <div className="p-3 bg-white/5 rounded-lg">
                  <span className="text-sm text-gray-400">
                    Detected language: <span className="text-white font-medium">{results.ocr.language}</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Raw Data Tab */}
          {activeTab === 'raw' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-400">Raw JSON Data</h3>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(results, null, 2), 'raw')}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg text-sm transition-colors"
                >
                  {copiedText === 'raw' ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="p-4 bg-gray-500/10 rounded-lg border border-gray-500/20 max-h-96 overflow-auto">
                <pre className="text-xs text-gray-300 leading-relaxed">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;