# VisionVault - Smart Image Insight Web App

A modern, AI-powered image analysis application that uses Azure Computer Vision API to provide comprehensive image insights including object detection, OCR text extraction, and smart image descriptions.

## Features

- **Image Upload & URL Support**: Upload images directly or provide image URLs
- **Object Detection**: Identify and visualize objects with bounding boxes
- **Smart Descriptions**: AI-generated captions and contextual tags
- **OCR Text Extraction**: Extract and display text content from images
- **Interactive Visualization**: Hover effects and detailed object information
- **Export Results**: Download analysis results as JSON
- **Modern UI**: Beautiful, responsive design with glass morphism effects

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Lucide React for icons
- Canvas API for bounding box visualization

### Backend
- Node.js with Express
- Multer for file uploads
- Azure Computer Vision API integration
- CORS enabled for cross-origin requests

## Setup Instructions

### Prerequisites
- Node.js 16+ installed
- Azure Computer Vision API key and endpoint

### Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   - Copy `.env.example` to `.env`
   - Add your Azure Computer Vision credentials:
   ```
   AZURE_VISION_ENDPOINT=https://your-region.cognitiveservices.azure.com/
   AZURE_VISION_KEY=your-api-key-here
   PORT=3001
   ```

3. **Start the development servers**:
   ```bash
   npm run dev
   ```
   This will start both the frontend (Vite) and backend (Express) servers concurrently.

4. **Access the application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

- `POST /api/analyze` - Analyze uploaded image or image URL
- `GET /api/health` - Health check and configuration status

## Azure Computer Vision Setup

1. Create an Azure Computer Vision resource in the Azure portal
2. Get your endpoint URL and API key from the resource overview
3. Add these credentials to your `.env` file

## Converting to Flask Backend

To use Flask instead of the Node.js backend, create a similar structure:

```python
from flask import Flask, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

AZURE_VISION_ENDPOINT = os.getenv('AZURE_VISION_ENDPOINT')
AZURE_VISION_KEY = os.getenv('AZURE_VISION_KEY')

@app.route('/api/analyze', methods=['POST'])
def analyze_image():
    # Similar logic to the Node.js version
    # Handle file uploads and URL processing
    # Make requests to Azure Computer Vision API
    # Return JSON response
    pass

if __name__ == '__main__':
    app.run(debug=True, port=3001)
```

## Component Architecture

### Frontend Components
- `App.tsx` - Main application component and state management
- `UploadForm.tsx` - File upload and URL input interface
- `ImageDisplay.tsx` - Image visualization with bounding boxes
- `ResultsPanel.tsx` - Tabbed results display with export functionality
- `LoadingSpinner.tsx` - Animated loading states

### Backend Structure
- `server.js` - Express server with API routes
- File upload handling with Multer
- Azure API integration
- Error handling and validation

## Features in Detail

### Object Detection
- Real-time bounding box visualization
- Hover interactions with object details
- Confidence scores for each detection
- Toggle visibility of bounding boxes

### OCR Text Extraction
- Extract text from images in multiple languages
- Copy extracted text to clipboard
- Language detection
- Formatted text display

### Smart Analysis
- AI-generated image descriptions
- Contextual tags with confidence scores
- Object categorization
- Scene understanding

## Production Deployment

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Deploy the backend** with your preferred hosting service
3. **Update API endpoints** in the frontend to point to your production backend
4. **Set environment variables** in your production environment

## License

MIT License - see LICENSE file for details.