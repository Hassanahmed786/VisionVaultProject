import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface DetectedObject {
  object: string;
  confidence: number;
  rectangle: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

interface ImageDisplayProps {
  imageUrl: string;
  objects: DetectedObject[];
  onReset: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, objects, onReset }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredObject, setHoveredObject] = useState<DetectedObject | null>(null);
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);

  useEffect(() => {
    if (imageLoaded && canvasRef.current && imageRef.current) {
      drawBoundingBoxes();
    }
  }, [imageLoaded, objects, hoveredObject, showBoundingBoxes]);

  const drawBoundingBoxes = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match image display size
    const rect = image.getBoundingClientRect();
    canvas.width = image.offsetWidth;
    canvas.height = image.offsetHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!showBoundingBoxes) return;

    // Calculate scale factors
    const scaleX = image.offsetWidth / image.naturalWidth;
    const scaleY = image.offsetHeight / image.naturalHeight;

    objects.forEach((obj, index) => {
      const { x, y, w, h } = obj.rectangle;
      const scaledX = x * scaleX;
      const scaledY = y * scaleY;
      const scaledW = w * scaleX;
      const scaledH = h * scaleY;

      const isHovered = hoveredObject === obj;
      
      // Set style based on hover state
      ctx.strokeStyle = isHovered ? '#F59E0B' : '#8B5CF6';
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.fillStyle = isHovered ? 'rgba(245, 158, 11, 0.2)' : 'rgba(139, 92, 246, 0.1)';

      // Draw filled rectangle
      ctx.fillRect(scaledX, scaledY, scaledW, scaledH);
      
      // Draw border
      ctx.strokeRect(scaledX, scaledY, scaledW, scaledH);

      // Draw label
      const label = `${obj.object} (${Math.round(obj.confidence * 100)}%)`;
      ctx.font = isHovered ? 'bold 14px system-ui' : '12px system-ui';
      ctx.fillStyle = isHovered ? '#F59E0B' : '#8B5CF6';
      
      const textMetrics = ctx.measureText(label);
      const textWidth = textMetrics.width;
      const textHeight = 16;
      
      // Background for text
      ctx.fillStyle = isHovered ? 'rgba(245, 158, 11, 0.9)' : 'rgba(139, 92, 246, 0.9)';
      ctx.fillRect(scaledX, scaledY - textHeight - 4, textWidth + 8, textHeight + 4);
      
      // Text
      ctx.fillStyle = 'white';
      ctx.fillText(label, scaledX + 4, scaledY - 6);
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const getObjectAtPosition = (x: number, y: number): DetectedObject | null => {
    if (!imageRef.current) return null;

    const rect = imageRef.current.getBoundingClientRect();
    const scaleX = imageRef.current.offsetWidth / imageRef.current.naturalWidth;
    const scaleY = imageRef.current.offsetHeight / imageRef.current.naturalHeight;

    const imageX = (x - rect.left) / scaleX;
    const imageY = (y - rect.top) / scaleY;

    return objects.find(obj => {
      const { x: objX, y: objY, w, h } = obj.rectangle;
      return imageX >= objX && imageX <= objX + w && imageY >= objY && imageY <= objY + h;
    }) || null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const obj = getObjectAtPosition(e.clientX, e.clientY);
    setHoveredObject(obj);
  };

  const handleMouseLeave = () => {
    setHoveredObject(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showBoundingBoxes
                ? 'bg-purple-500/20 text-purple-400'
                : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
            }`}
          >
            {showBoundingBoxes ? 'Hide' : 'Show'} Bounding Boxes
          </button>
          <span className="text-sm text-gray-400">
            {objects.length} object{objects.length !== 1 ? 's' : ''} detected
          </span>
        </div>
        
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500/20 hover:bg-gray-500/30 rounded-lg text-sm font-medium transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          <span>New Image</span>
        </button>
      </div>

      {/* Image Container */}
      <div className="relative bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
        <div 
          className="relative inline-block w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Uploaded for analysis"
            className="w-full h-auto max-h-96 object-contain"
            onLoad={handleImageLoad}
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Hover Tooltip */}
        {hoveredObject && (
          <div className="absolute top-4 right-4 p-3 bg-amber-500/90 backdrop-blur-lg rounded-lg text-black font-medium shadow-lg">
            <div className="text-sm font-bold">{hoveredObject.object}</div>
            <div className="text-xs">Confidence: {Math.round(hoveredObject.confidence * 100)}%</div>
          </div>
        )}
      </div>

      {/* Object List */}
      {objects.length > 0 && (
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-4">
          <h3 className="text-lg font-semibold mb-3 text-purple-400">Detected Objects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {objects.map((obj, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  hoveredObject === obj
                    ? 'bg-amber-500/20 border-amber-500/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onMouseEnter={() => setHoveredObject(obj)}
                onMouseLeave={() => setHoveredObject(null)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{obj.object}</span>
                  <span className="text-sm text-gray-400">
                    {Math.round(obj.confidence * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;