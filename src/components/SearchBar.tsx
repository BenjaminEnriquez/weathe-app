import React, { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationRequest: () => void;
  loading: boolean;
  placeholder?: string;
}

interface QuickSearchOption {
  label: string;
  value: string;
  icon: string;
}

const quickSearchOptions: QuickSearchOption[] = [
  { label: "New York", value: "New York", icon: "🏙️" },
  { label: "London", value: "London", icon: "🇬🇧" },
  { label: "Tokyo", value: "Tokyo", icon: "🗾" },
  { label: "Paris", value: "Paris", icon: "🇫🇷" },
  { label: "Sydney", value: "Sydney", icon: "🇦🇺" },
];

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onLocationRequest,
  loading,
  placeholder = "Search any city, country, or coordinates..."
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSearch(query.trim());
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleLocationClick = () => {
    if (!loading) {
      onLocationRequest();
      setIsFocused(false);
    }
  };

  const handleQuickSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      <div className="relative">
        {/* Main search form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className={`glass-heavy rounded-4xl p-3 shadow-professional transition-all duration-300 ${
            isFocused ? 'ring-2 ring-white/20 shadow-elevation-3' : ''
          }`}>
            <div className="flex items-center gap-3">
              {/* Search icon */}
              <div className="pl-3">
                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Input field */}
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-white placeholder-white/50 px-2 py-4 outline-none text-lg font-medium"
                disabled={loading}
                autoComplete="off"
              />
              
              {/* Location button */}
              <button
                type="button"
                onClick={handleLocationClick}
                disabled={loading}
                className="professional-button p-4 hover:scale-110 group"
                title="Use current location"
              >
                <svg className="w-5 h-5 group-hover:text-primary-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              
              {/* Search button */}
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="professional-button-primary px-8 py-4 font-bold flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Quick search suggestions */}
        {isFocused && !loading && (
          <div className="absolute top-full left-0 right-0 mt-4 z-50 animate-slide-down">
            <div className="glass rounded-3xl p-6 shadow-elevation-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white/80 font-medium text-sm uppercase tracking-wide">
                  Quick Search
                </h3>
                <button
                  onClick={() => setIsFocused(false)}
                  className="text-white/40 hover:text-white/80 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {quickSearchOptions.map((option, index) => (
                  <button
                    key={option.value}
                    onClick={() => handleQuickSearch(option.value)}
                    className="glass-dark rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                      {option.icon}
                    </div>
                    <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                      {option.label}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="text-white/50 text-xs text-center">
                  💡 Try searching for cities, countries, or coordinates (lat,lng)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};