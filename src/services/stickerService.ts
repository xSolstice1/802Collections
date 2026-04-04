/**
 * Sticker Processing Service
 * 
 * Handles all image processing for Telegram sticker creation:
 * - Canvas-based image manipulation
 * - White stroke application
 * - Shadow effects
 * - Resizing and formatting
 */

export interface StickerOptions {
  strokeThickness: number; // 8-16px
  shadowIntensity: number; // 0-100
  outputFormat: 'png' | 'webp';
  quality: number; // 0-100 for webp
}

export interface ProcessingResult {
  success: boolean;
  dataUrl?: string;
  blob?: Blob;
  error?: string;
  width: number;
  height: number;
}

export const DEFAULT_STICKER_OPTIONS: StickerOptions = {
  strokeThickness: 12,
  shadowIntensity: 30,
  outputFormat: 'png',
  quality: 92,
};

/**
 * Telegram Sticker Requirements:
 * - One side must be exactly 512px
 * - Other side must be <= 512px
 * - Format: PNG or WEBP
 * - Max file size: 512KB (recommended)
 */
const STICKER_SIZE = 512;

/**
 * Calculate dimensions maintaining aspect ratio
 */
function calculateStickerDimensions(
  imageWidth: number,
  imageHeight: number
): { width: number; height: number } {
  if (imageWidth >= imageHeight) {
    const scale = STICKER_SIZE / imageWidth;
    return {
      width: STICKER_SIZE,
      height: Math.round(imageHeight * scale),
    };
  } else {
    const scale = STICKER_SIZE / imageHeight;
    return {
      width: Math.round(imageWidth * scale),
      height: STICKER_SIZE,
    };
  }
}

/**
 * Load an image from a data URL or blob
 */
function loadImage(source: string | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    
    if (typeof source === 'string') {
      img.src = source;
    } else {
      img.src = URL.createObjectURL(source);
    }
  });
}

/**
 * Apply stroke using the multi-pass offset approach for better quality
 * This creates a white outline around the image by:
 * 1. Drawing the image silhouette multiple times with offsets (the stroke)
 * 2. Using destination-in to keep only the stroke area (not covered by original)
 * 3. Filling the stroke with white
 * 4. Drawing the original image on top
 */
function applyHighQualityStroke(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  thickness: number
): void {
  // Number of passes based on thickness
  const passes = Math.max(1, Math.floor(thickness / 2));
  
  // Generate offsets for all directions (8-directional)
  const offsets: [number, number][] = [];
  
  for (let pass = 1; pass <= passes; pass++) {
    // 8 directions for each pass
    offsets.push([-pass, -pass], [0, -pass], [pass, -pass]);
    offsets.push([-pass, 0], [pass, 0]);
    offsets.push([-pass, pass], [0, pass], [pass, pass]);
    
    // Add intermediate offsets for smoother stroke
    if (pass > 1) {
      for (let i = -pass + 1; i < pass; i++) {
        offsets.push([i, -pass], [i, pass]);
        offsets.push([-pass, i], [pass, i]);
      }
    }
  }
  
  // Save the current canvas state
  ctx.save();
  
  // Step 1: Draw the original image silhouette (this will be used as a mask)
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(image, x, y, width, height);
  
  // Step 2: Create a temporary canvas for the stroke
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = ctx.canvas.width;
  tempCanvas.height = ctx.canvas.height;
  const tempCtx = tempCanvas.getContext('2d')!;
  
  // Step 3: Draw the stroke on temp canvas (offset copies of the image)
  for (const [ox, oy] of offsets) {
    tempCtx.drawImage(image, x + ox, y + oy, width, height);
  }
  
  // Step 4: Remove the original image area from the stroke (so stroke is only around the edges)
  tempCtx.globalCompositeOperation = 'destination-out';
  tempCtx.drawImage(image, x, y, width, height);
  tempCtx.globalCompositeOperation = 'source-over';
  
  // Step 5: Fill the stroke with white
  tempCtx.globalCompositeOperation = 'source-in';
  tempCtx.fillStyle = '#FFFFFF';
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
  tempCtx.globalCompositeOperation = 'source-over';
  
  // Step 6: Draw the stroke onto the main canvas
  ctx.drawImage(tempCanvas, 0, 0);
  
  // Step 7: Draw the original image on top
  ctx.globalCompositeOperation = 'source-over';
  ctx.drawImage(image, x, y, width, height);
  
  ctx.restore();
}

/**
 * Process an image into a Telegram sticker
 */
export async function processSticker(
  imageSource: string | Blob,
  options: StickerOptions = DEFAULT_STICKER_OPTIONS
): Promise<ProcessingResult> {
  try {
    // Load the image
    const img = await loadImage(imageSource);
    
    // Calculate dimensions
    const dims = calculateStickerDimensions(img.width, img.height);
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = STICKER_SIZE;
    canvas.height = STICKER_SIZE;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    if (!ctx) {
      return {
        success: false,
        error: 'Failed to create canvas context',
        width: 0,
        height: 0,
      };
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, STICKER_SIZE, STICKER_SIZE);
    
    // Calculate center position
    const x = (STICKER_SIZE - dims.width) / 2;
    const y = (STICKER_SIZE - dims.height) / 2;
    
    // Apply shadow first (behind everything)
    if (options.shadowIntensity > 0) {
      // Create a temporary canvas for shadow
      const shadowCanvas = document.createElement('canvas');
      shadowCanvas.width = STICKER_SIZE;
      shadowCanvas.height = STICKER_SIZE;
      const shadowCtx = shadowCanvas.getContext('2d')!;
      
      shadowCtx.drawImage(img, x, y, dims.width, dims.height);
      
      // Apply shadow to main canvas
      const shadowBlur = (options.shadowIntensity / 100) * 20 + 5;
      const shadowOffsetY = (options.shadowIntensity / 100) * 8 + 2;
      const shadowOpacity = (options.shadowIntensity / 100) * 0.4;
      
      ctx.save();
      ctx.shadowColor = `rgba(0, 0, 0, ${shadowOpacity})`;
      ctx.shadowBlur = shadowBlur;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = shadowOffsetY;
      ctx.drawImage(shadowCanvas, 0, 0);
      ctx.restore();
    }
    
    // Apply stroke (white outline)
    if (options.strokeThickness > 0) {
      applyHighQualityStroke(ctx, img, x, y, dims.width, dims.height, options.strokeThickness);
    } else {
      // No stroke, just draw the image
      ctx.drawImage(img, x, y, dims.width, dims.height);
    }
    
    // Convert to desired format
    const mimeType = options.outputFormat === 'webp' ? 'image/webp' : 'image/png';
    const quality = options.outputFormat === 'webp' ? options.quality / 100 : undefined;
    
    const dataUrl = canvas.toDataURL(mimeType, quality);
    
    return {
      success: true,
      dataUrl,
      width: STICKER_SIZE,
      height: STICKER_SIZE,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error processing image',
      width: 0,
      height: 0,
    };
  }
}

/**
 * Process a sticker from an already background-removed image (PNG with alpha)
 */
export async function processStickerFromRemovedBg(
  imageDataUrl: string,
  options: StickerOptions = DEFAULT_STICKER_OPTIONS
): Promise<ProcessingResult> {
  return processSticker(imageDataUrl, options);
}

/**
 * Convert data URL to Blob
 */
export function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  return new Promise((resolve) => {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    resolve(new Blob([u8arr], { type: mime }));
  });
}

/**
 * Download a sticker file
 */
export function downloadSticker(dataUrl: string, filename: string = 'sticker'): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Validate image file for sticker creation
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload JPG, PNG, or WEBP images.',
    };
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 10MB limit.',
    };
  }
  
  return { valid: true };
}

/**
 * Create a preview thumbnail from an image
 */
export async function createThumbnail(
  imageSource: string | Blob,
  maxSize: number = 200
): Promise<string> {
  try {
    const img = await loadImage(imageSource);
    
    let width = img.width;
    let height = img.height;
    
    if (width > maxSize || height > maxSize) {
      if (width >= height) {
        height = (height / width) * maxSize;
        width = maxSize;
      } else {
        width = (width / height) * maxSize;
        height = maxSize;
      }
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);
    
    return canvas.toDataURL('image/png');
  } catch {
    return '';
  }
}