import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { ForecastCard } from './components/ForecastCard';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';

const App: React.FC = () => {
  const {
    weatherData,
    loading,
    error,
    fetchForecastWeather,
    clearError,
  } = useWeather();

  const {
    getCurrentPosition,
    getLocationString,
    loading: geoLoading,
    error: geoError
  } = useGeolocation();

  const handleSearch = async (query: string) => {
    await fetchForecastWeather(query, 5);
  };

  const handleLocationRequest = () => {
    getCurrentPosition();
  };

  // Auto-request location on first load
  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    const locationString = getLocationString();
    if (locationString && !geoError) {
      handleSearch(locationString);
    }
  }, [getLocationString()]);

  // Fallback to default location if geolocation fails or is denied
  useEffect(() => {
    if (!weatherData && !loading && !error && geoError) {
      handleSearch('London');
    }
  }, [geoError]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-400 via-primary-500 to-primary-700 px-4 py-6">
      <div className="container mx-auto max-w-8xl">
        {/* App Header */}
        <Header />
        
        {/* Search Interface */}
        <div className="mb-12">
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            loading={loading || geoLoading}
          />
        </div>

        {/* Main Content Area */}
        <main className="space-y-8">
          {/* Loading States */}
          {(loading || geoLoading) && (
            <div className="flex justify-center">
              <LoadingSpinner 
                message={geoLoading ? "Detecting your location..." : "Fetching latest weather data..."}
              />
            </div>
          )}

          {/* Error States */}
          {(error || geoError) && (
            <div className="space-y-4">
              {error && (
                <ErrorMessage 
                  message={error} 
                  onDismiss={clearError}
                />
              )}
              {geoError && (
                <ErrorMessage 
                  message={geoError}
                />
              )}
            </div>
          )}

          {/* Weather Dashboard */}
          {weatherData && !loading && !error && (
            <div className="space-y-12">
              {/* Current Weather */}
              <section>
                <WeatherCard weatherData={weatherData} />
              </section>
              
              {/* Forecast Section */}
              {weatherData.forecast && weatherData.forecast.forecastday && (
                <section>
                  <ForecastCard forecast={weatherData.forecast.forecastday} />
                </section>
              )}
            </div>
          )}

          {/* Empty State - Only show if no location detection in progress */}
          {!weatherData && !loading && !error && !geoLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center max-w-lg">
                <div className="card-professional p-12">
                  {/* Animated Weather Icon */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                    <svg className="w-24 h-24 text-white/40 mx-auto relative z-10 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-white mb-4">
                    Location Access Needed
                  </h3>
                  <p className="text-white/70 text-lg mb-8 leading-relaxed">
                    {geoError ? (
                      <>We couldn't access your location automatically. Please search for a location or try enabling location access.</>
                    ) : (
                      <>Search for any location to get started with detailed weather information and forecasts.</>
                    )}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleLocationRequest}
                      className="professional-button-primary"
                      disabled={geoLoading}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {geoError ? 'Retry Location' : 'Use My Location'}
                    </button>
                    
                    <button 
                      onClick={() => handleSearch('New York')}
                      className="professional-button"
                    >
                      Try Demo Location
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* App Footer */}
        <footer className="mt-20 pt-12 border-t border-white/10">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-8 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Weather Data</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
                <span>Global Coverage</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure & Private</span>
              </div>
            </div>
            
            <div className="text-white/40 text-sm">
              Powered by{' '}
              <a 
                href="https://weatherapi.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors duration-200 font-medium"
              >
                WeatherAPI
              </a>
              {' • '}
              <span>Built with React & Tailwind CSS</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;