import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Loading weather data..." 
}) => {
  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in">
      <div className="card-professional p-12 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* Enhanced animated loading indicator */}
          <div className="relative">
            {/* Outer ring */}
            <div className="w-20 h-20 border-4 border-white/10 rounded-full"></div>
            {/* Spinning ring */}
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-white/80 border-r-white/40 rounded-full animate-spin"></div>
            {/* Inner pulsing weather icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <svg 
                  className="w-8 h-8 text-white animate-pulse" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
                  />
                </svg>
                {/* Floating particles */}
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white/30 rounded-full animate-ping delay-300"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-white text-xl font-semibold">
              {message}
            </p>
            
            <div className="flex items-center justify-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-white/60 to-white/40 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1.8s'
                  }}
                ></div>
              ))}
            </div>
            
            <div className="text-white/60 text-sm mt-4">
              Please wait while we fetch the latest data...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};