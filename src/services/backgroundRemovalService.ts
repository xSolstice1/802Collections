/**
 * Background Removal Service
 * 
 * Provides client-side background removal using the imgly/background-removal-js package.
 * This uses a machine learning model running entirely in the browser via ONNX Runtime.
 * 
 * Features:
 * - High-quality AI-powered background removal
 * - No server required - runs entirely in the browser
 * - Works with any image format supported by the browser
 * - Automatic model loading and caching
 */

import { removeBackground as imglyRemoveBackground } from '@imgly/background-removal';

export interface BackgroundRemovalResult {
  success: boolean;
  dataUrl?: string;
  blob?: Blob;
  error?: string;
  usedFallback?: boolean;
}

/**
 * Remove background from an image using imgly/background-removal-js
 */
export async function removeBackground(file: File): Promise<BackgroundRemovalResult> {
  try {
    // Use imgly background removal with optimized config for browser usage
    const blob = await imglyRemoveBackground(file, {
      progress: (_key: string, _current: number, _total: number) => {
        // Progress callback - could be used to show loading progress
      },
    });

    // Convert blob to data URL for preview
    const dataUrl = await blobToDataUrl(blob);

    return {
      success: true,
      dataUrl,
      blob,
      usedFallback: false,
    };
  } catch (error) {
    console.error('Background removal failed:', error);
    
    // If imgly fails, fall back to simple canvas-based removal
    return removeBackgroundFallback(file);
  }
}

/**
 * Fallback background removal using simple canvas-based approach
 * This is used if the main imgly package fails to load or process
 */
async function removeBackgroundFallback(file: File): Promise<BackgroundRemovalResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d')!;
          
          // Draw the image
          ctx.drawImage(img, 0, 0);
          
          // Get pixel data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Sample background color from corners
          const bgColor = getDominantCornerColor(data, canvas.width, canvas.height);
          
          // Remove background based on color similarity
          const threshold = 50; // Color tolerance
          
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            const diff = Math.abs(r - bgColor.r) + 
                        Math.abs(g - bgColor.g) + 
                        Math.abs(b - bgColor.b);
            
            if (diff < threshold) {
              // Make pixel transparent
              data[i + 3] = 0;
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          const resultDataUrl = canvas.toDataURL('image/png');
          
          resolve({
            success: true,
            dataUrl: resultDataUrl,
            usedFallback: true,
          });
        } catch (error) {
          resolve({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to process image',
            usedFallback: true,
          });
        }
      };
      
      img.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to load image for processing',
          usedFallback: true,
        });
      };
      
      img.src = dataUrl;
    };
    
    reader.onerror = () => {
      resolve({
        success: false,
        error: 'Failed to read file',
        usedFallback: true,
      });
    };
    
    reader.readAsDataURL(file);
  });
}

/**
 * Get the dominant color from the corners of an image
 * Used for simple background detection in fallback mode
 */
function getDominantCornerColor(
  data: Uint8ClampedArray,
  width: number,
  height: number
): { r: number; g: number; b: number } {
  const sampleSize = 10;
  let totalR = 0, totalG = 0, totalB = 0, count = 0;
  
  // Sample from all four corners
  const corners = [
    { x: 0, y: 0 },
    { x: width - sampleSize, y: 0 },
    { x: 0, y: height - sampleSize },
    { x: width - sampleSize, y: height - sampleSize },
  ];
  
  for (const corner of corners) {
    for (let dy = 0; dy < sampleSize; dy++) {
      for (let dx = 0; dx < sampleSize; dx++) {
        const x = corner.x + dx;
        const y = corner.y + dy;
        const idx = (y * width + x) * 4;
        
        totalR += data[idx];
        totalG += data[idx + 1];
        totalB += data[idx + 2];
        count++;
      }
    }
  }
  
  return {
    r: Math.round(totalR / count),
    g: Math.round(totalG / count),
    b: Math.round(totalB / count),
  };
}

/**
 * Convert a Blob to a Data URL
 */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}