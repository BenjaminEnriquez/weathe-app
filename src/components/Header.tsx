import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="relative text-center py-12 mb-16 animate-fade-in">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float"></div>
      </div>

      {/* Brand identity */}
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="glass-heavy rounded-4xl p-6 hover-lift">
            <div className="relative">
              {/* Main weather icon */}
              <svg 
                className="w-16 h-16 text-white weather-icon" 
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
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-2 -left-1 w-2 h-2 bg-white/30 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
        
        {/* Brand name and tagline */}
        <div className="space-y-4">
          <h1 className="font-display text-7xl font-black gradient-text tracking-tight leading-tight">
            WeatherPro
          </h1>
          
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-16"></div>
            <div className="status-indicator">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/80 font-medium">Live Data</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1 max-w-16"></div>
          </div>
          
          <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Professional weather intelligence with precision forecasting and 
            <span className="text-white/90 font-semibold"> real-time atmospheric data</span>
          </p>
        </div>

        {/* Feature highlights */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm">
          <div className="flex items-center gap-2 text-white/60">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Real-time Updates</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2 text-white/60">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            <span>Global Coverage</span>
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <div className="flex items-center gap-2 text-white/60">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>5-Day Forecasts</span>
          </div>
        </div>
      </div>
    </header>
  );
};