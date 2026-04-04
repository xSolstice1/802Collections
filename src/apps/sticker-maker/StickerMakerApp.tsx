import { useState, useCallback, useRef } from 'react';
import {
  Upload,
  Download,
  Image,
  Scissors,
  Sparkles,
  Trash2,
  AlertCircle,
  Check,
  Loader2,
  Settings2,
} from 'lucide-react';
import {
  processSticker,
  downloadSticker,
  validateImageFile,
  createThumbnail,
  DEFAULT_STICKER_OPTIONS,
  type StickerOptions,
} from '@services/stickerService';
import {
  removeBackground,
} from '@services/backgroundRemovalService';

type ProcessingStep = 'idle' | 'uploading' | 'removing-bg' | 'processing' | 'complete' | 'error';

interface PreviewState {
  original: string | null;
  backgroundRemoved: string | null;
  finalSticker: string | null; // Thumbnail for preview
  fullResSticker: string | null; // Full resolution for download
}

/**
 * Telegram Sticker Maker App
 * 
 * A comprehensive tool for creating Telegram-compliant stickers:
 * - Upload any image (JPG, PNG, WEBP up to 10MB)
 * - AI-powered background removal (client-side using imgly/background-removal-js)
 * - Apply Telegram-style white stroke and shadow
 * - Resize to 512x512 compliant format
 * - Download as PNG or WEBP
 */
const StickerMakerApp = () => {
  // State
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<PreviewState>({
    original: null,
    backgroundRemoved: null,
    finalSticker: null,
    fullResSticker: null,
  });
  const [options, setOptions] = useState<StickerOptions>(DEFAULT_STICKER_OPTIONS);
  const [showSettings, setShowSettings] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  // Handle file selection
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setProcessingStep('uploading');

    try {
      // Read and preview original image
      const reader = new FileReader();
      reader.onload = async (e) => {
        const originalDataUrl = e.target?.result as string;
        
        // Create thumbnail for preview
        const thumbnail = await createThumbnail(originalDataUrl, 200);
        
        setPreviews(prev => ({
          ...prev,
          original: thumbnail || originalDataUrl,
        }));

        setProcessingStep('removing-bg');

        // Remove background
        const bgRemovalResult = await removeBackground(file);
        
        if (!bgRemovalResult.success) {
          setError(bgRemovalResult.error || 'Failed to remove background');
          setProcessingStep('error');
          return;
        }

        const bgRemovedThumbnail = await createThumbnail(bgRemovalResult.dataUrl!, 200);
        
        setPreviews(prev => ({
          ...prev,
          backgroundRemoved: bgRemovedThumbnail || bgRemovalResult.dataUrl!,
        }));

        // If user wants to see the result before processing, we could stop here
        // For now, auto-process to final sticker
        setProcessingStep('processing');

        // Process final sticker
        const stickerResult = await processSticker(
          bgRemovalResult.dataUrl!,
          options
        );

        if (!stickerResult.success) {
          setError(stickerResult.error || 'Failed to process sticker');
          setProcessingStep('error');
          return;
        }

        const stickerThumbnail = await createThumbnail(stickerResult.dataUrl!, 200);

        setPreviews(prev => ({
          ...prev,
          finalSticker: stickerThumbnail,
          fullResSticker: stickerResult.dataUrl!,
        }));

        setProcessingStep('complete');
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setProcessingStep('error');
      };

      reader.readAsDataURL(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setProcessingStep('error');
    }
  }, [options]);

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFileSelect]);

  // Re-process with new options
  const handleReprocess = useCallback(async () => {
    if (!previews.backgroundRemoved) return;

    setProcessingStep('processing');
    setError(null);

    try {
      const stickerResult = await processSticker(previews.backgroundRemoved, options);

      if (!stickerResult.success) {
        setError(stickerResult.error || 'Failed to process sticker');
        setProcessingStep('error');
        return;
      }

      const stickerThumbnail = await createThumbnail(stickerResult.dataUrl!, 200);

      setPreviews(prev => ({
        ...prev,
        finalSticker: stickerThumbnail,
        fullResSticker: stickerResult.dataUrl!,
      }));

      setProcessingStep('complete');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setProcessingStep('error');
    }
  }, [previews.backgroundRemoved, options]);

  // Download sticker
  const handleDownload = useCallback(() => {
    if (!previews.fullResSticker) return;

    const ext = options.outputFormat === 'webp' ? 'webp' : 'png';
    downloadSticker(previews.fullResSticker, `sticker.${ext}`);
  }, [previews.fullResSticker, options.outputFormat]);

  // Reset everything
  const handleReset = useCallback(() => {
    setProcessingStep('idle');
    setError(null);
    setPreviews({
      original: null,
      backgroundRemoved: null,
      finalSticker: null,
      fullResSticker: null,
    });
  }, []);

  // Get status message
  const getStatusMessage = (): string => {
    switch (processingStep) {
      case 'uploading':
        return 'Uploading image...';
      case 'removing-bg':
        return 'Removing background...';
      case 'processing':
        return 'Applying sticker effects...';
      case 'complete':
        return 'Sticker ready!';
      case 'error':
        return 'Error occurred';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-802/10 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-802" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-dark-100">Telegram Sticker Maker</h2>
          <p className="text-sm text-dark-500">
            Create perfect Telegram stickers from any image
          </p>
        </div>
      </div>

      {/* Backend Status */}

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Upload & Controls */}
        <div className="lg:col-span-1 space-y-4">
          {/* Upload Area */}
          <div
            className={`card cursor-pointer transition-all duration-200 ${
              dragActive ? 'border-802 bg-802/5' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleInputChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-802/10 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-802" />
              </div>
              <p className="text-dark-200 font-medium mb-1">
                Drop an image here or click to browse
              </p>
              <p className="text-dark-500 text-sm">
                JPG, PNG, WEBP • Max 10MB
              </p>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="card">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center justify-between w-full mb-4"
            >
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-dark-400" />
                <span className="text-dark-200 font-medium">Sticker Settings</span>
              </div>
              <span className="text-dark-500 text-sm">
                {showSettings ? '▼' : '▶'}
              </span>
            </button>

            {showSettings && (
              <div className="space-y-4">
                {/* Stroke Thickness */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm text-dark-400">White Stroke</label>
                    <span className="text-sm text-802">{options.strokeThickness}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={options.strokeThickness}
                    onChange={(e) => setOptions(prev => ({ ...prev, strokeThickness: Number(e.target.value) }))}
                    className="w-full accent-802"
                  />
                </div>

                {/* Shadow Intensity */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm text-dark-400">Shadow Intensity</label>
                    <span className="text-sm text-802">{options.shadowIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={options.shadowIntensity}
                    onChange={(e) => setOptions(prev => ({ ...prev, shadowIntensity: Number(e.target.value) }))}
                    className="w-full accent-802"
                  />
                </div>

                {/* Output Format */}
                <div className="space-y-2">
                  <label className="text-sm text-dark-400">Output Format</label>
                  <div className="flex bg-dark-800 rounded-lg p-1">
                    <button
                      onClick={() => setOptions(prev => ({ ...prev, outputFormat: 'png' }))}
                      className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                        options.outputFormat === 'png'
                          ? 'bg-802 text-dark-950'
                          : 'text-dark-400 hover:text-dark-200'
                      }`}
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => setOptions(prev => ({ ...prev, outputFormat: 'webp' }))}
                      className={`flex-1 px-3 py-1.5 text-sm rounded-md transition-colors ${
                        options.outputFormat === 'webp'
                          ? 'bg-802 text-dark-950'
                          : 'text-dark-400 hover:text-dark-200'
                      }`}
                    >
                      WEBP
                    </button>
                  </div>
                </div>

                {/* Reprocess Button */}
                {previews.backgroundRemoved && (
                  <button
                    onClick={handleReprocess}
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Reprocess with New Settings
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {processingStep === 'complete' && (
            <div className="flex gap-3">
              <button onClick={handleDownload} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button onClick={handleReset} className="btn-ghost flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {processingStep === 'error' && (
            <button onClick={handleReset} className="btn-primary w-full">
              Try Again
            </button>
          )}
        </div>

        {/* Right Column: Previews */}
        <div className="lg:col-span-2">
          <div className="card h-full">
            <h3 className="text-lg font-medium text-dark-200 mb-4">Preview</h3>

            {processingStep === 'idle' && (
              <div className="flex flex-col items-center justify-center py-16 text-dark-500">
                <Image className="w-16 h-16 mb-4 opacity-50" />
                <p>Upload an image to get started</p>
              </div>
            )}

            {(processingStep !== 'idle') && (
              <div className="grid md:grid-cols-3 gap-4">
                {/* Original */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-dark-500" />
                    <span className="text-sm text-dark-400">Original</span>
                  </div>
                  <div className="aspect-square rounded-lg bg-dark-800 border border-dark-600 overflow-hidden flex items-center justify-center">
                    {previews.original ? (
                      <img src={previews.original} alt="Original" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <Loader2 className="w-8 h-8 text-dark-500 animate-spin" />
                    )}
                  </div>
                </div>

                {/* Background Removed */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-sm text-dark-400">No Background</span>
                  </div>
                  <div className="aspect-square rounded-lg bg-dark-800 border border-dark-600 overflow-hidden flex items-center justify-center relative">
                    {/* Checkerboard pattern for transparency */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Crect x='0' width='10' height='10'/%3E%3Crect x='10' y='10' width='10' height='10'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    {previews.backgroundRemoved ? (
                      <img src={previews.backgroundRemoved} alt="Background Removed" className="max-w-full max-h-full object-contain relative z-10" />
                    ) : processingStep === 'removing-bg' ? (
                      <div className="flex flex-col items-center gap-2">
                        <Scissors className="w-8 h-8 text-dark-500 animate-pulse" />
                        <span className="text-xs text-dark-500">Removing background...</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Final Sticker */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-802" />
                    <span className="text-sm text-dark-400">Final Sticker</span>
                  </div>
                  <div className="aspect-square rounded-lg bg-dark-800 border border-dark-600 overflow-hidden flex items-center justify-center relative">
                    {/* Checkerboard pattern for transparency */}
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Crect x='0' width='10' height='10'/%3E%3Crect x='10' y='10' width='10' height='10'/%3E%3C/g%3E%3C/svg%3E")`,
                      }}
                    />
                    {previews.finalSticker ? (
                      <img src={previews.finalSticker} alt="Final Sticker" className="max-w-full max-h-full object-contain relative z-10" />
                    ) : processingStep === 'processing' ? (
                      <div className="flex flex-col items-center gap-2">
                        <Sparkles className="w-8 h-8 text-dark-500 animate-pulse" />
                        <span className="text-xs text-dark-500">Applying effects...</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            {/* Status / Error Messages */}
            {processingStep !== 'idle' && processingStep !== 'complete' && (
              <div className="mt-6 p-4 rounded-lg bg-dark-800 border border-dark-600">
                <div className="flex items-center gap-3">
                  {processingStep === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <Loader2 className="w-5 h-5 text-802 animate-spin" />
                  )}
                  <div>
                    <p className={`text-sm ${processingStep === 'error' ? 'text-red-400' : 'text-dark-200'}`}>
                      {getStatusMessage()}
                    </p>
                    {error && (
                      <p className="text-xs text-red-400 mt-1">{error}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Success Message */}
            {processingStep === 'complete' && (
              <div className="mt-6 p-4 rounded-lg bg-802/10 border border-802/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-802/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-802" />
                  </div>
                  <div>
                    <p className="text-sm text-dark-200 font-medium">Sticker ready for download!</p>
                    <p className="text-xs text-dark-500 mt-1">
                      Size: 512×512 • Format: {options.outputFormat.toUpperCase()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Requirements Info */}
      <div className="card">
        <h3 className="text-lg font-medium text-dark-200 mb-3">Telegram Sticker Requirements</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-dark-400">
          <div className="space-y-2">
            <p>• One side must be exactly <span className="text-802">512px</span></p>
            <p>• Other side must be ≤ 512px</p>
            <p>• Format: PNG or WEBP</p>
          </div>
          <div className="space-y-2">
            <p>• White outline (stroke) for visibility</p>
            <p>• Soft shadow for depth</p>
            <p>• Transparent background</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerMakerApp;