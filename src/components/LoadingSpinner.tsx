import type { LoadingProps } from '@model/index';

/**
 * LoadingSpinner Component
 * 
 * Displays a loading indicator while content is being fetched or loaded.
 * Supports different variants: spinner, skeleton, and progress.
 */
export const LoadingSpinner = ({ 
  message = 'Loading...', 
  variant = 'spinner' 
}: LoadingProps) => {
  if (variant === 'skeleton') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
        <div className="w-full max-w-md space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-dark-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-dark-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-dark-700 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-dark-700 rounded w-2/3"></div>
          </div>
        </div>
        {message && (
          <p className="mt-6 text-sm text-dark-500 animate-pulse">{message}</p>
        )}
      </div>
    );
  }

  if (variant === 'progress') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
        <div className="w-full max-w-md">
          <div className="h-1 bg-dark-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-802 animate-pulse-slow"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>
        {message && (
          <p className="mt-6 text-sm text-dark-500">{message}</p>
        )}
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 border-2 border-dark-700 rounded-full"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-802 border-r-802/50 rounded-full animate-spin"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-2 w-8 h-8 bg-802/10 rounded-full animate-pulse"></div>
      </div>
      
      {message && (
        <p className="mt-6 text-sm text-dark-500 animate-pulse">{message}</p>
      )}
    </div>
  );
};