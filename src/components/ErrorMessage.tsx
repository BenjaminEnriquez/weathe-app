import React from 'react';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-down">
      <div className="bg-red-500/15 backdrop-blur-lg border border-red-400/20 rounded-4xl p-8 shadow-elevation-2">
        <div className="flex items-start gap-6">
          {/* Error icon with animated background */}
          <div className="flex-shrink-0 relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg animate-pulse"></div>
            <div className="relative bg-red-500/30 rounded-full p-3">
              <svg 
                className="w-6 h-6 text-red-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
          </div>
          
          {/* Error content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-red-100 font-semibold text-lg">
                Unable to Load Weather Data
              </h3>
              <div className="status-indicator bg-red-500/20 border-red-400/30">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-200 text-xs">Error</span>
              </div>
            </div>
            
            <p className="text-red-200/90 text-base leading-relaxed mb-4">
              {message}
            </p>
            
            {/* Helpful suggestions */}
            <div className="bg-red-500/10 rounded-3xl p-4 border border-red-400/20">
              <div className="text-red-200/80 text-sm">
                <div className="font-medium mb-2">💡 Try these solutions:</div>
                <ul className="space-y-1 text-xs">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400/60 rounded-full"></div>
                    <span>Check your internet connection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400/60 rounded-full"></div>
                    <span>Try searching for a different location</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-red-400/60 rounded-full"></div>
                    <span>Refresh the page and try again</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Dismiss button */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 text-red-300/60 hover:text-red-200 transition-all duration-200 hover:scale-110 p-2 rounded-full hover:bg-red-500/10"
              aria-label="Dismiss error"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};