import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { location, current } = weatherData;

  const formatTime = (timeString: string) => {
    try {
      return new Date(timeString).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return timeString;
    }
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { level: 'Low', color: 'text-green-400' };
    if (uv <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
    if (uv <= 7) return { level: 'High', color: 'text-orange-400' };
    if (uv <= 10) return { level: 'Very High', color: 'text-red-400' };
    return { level: 'Extreme', color: 'text-purple-400' };
  };

  const getAirQualityColor = (humidity: number) => {
    if (humidity <= 30) return 'text-orange-400';
    if (humidity <= 60) return 'text-green-400';
    return 'text-blue-400';
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-scale-in">
      <div className="card-professional p-10">
        {/* Location Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <div className="status-indicator">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/80 font-medium">Live</span>
              </div>
            </div>
            <h1 className="font-display text-5xl font-black gradient-text mb-3 tracking-tight">
              {location.name}
            </h1>
            <p className="text-white/70 text-xl font-medium">
              {location.region && `${location.region}, `}{location.country}
            </p>
          </div>
          
          <div className="text-center lg:text-right">
            <div className="glass-dark rounded-3xl p-6 inline-block">
              <div className="text-white/60 text-sm uppercase tracking-wide mb-1">Local Time</div>
              <div className="text-white text-xl font-semibold">
                {formatTime(location.localtime)}
              </div>
            </div>
          </div>
        </div>

        {/* Main Temperature Display */}
        <div className="mb-12">
          <div className="glass-heavy rounded-5xl p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Temperature Section */}
              <div className="text-center lg:text-left flex-1">
                <div className="flex items-center justify-center lg:justify-start gap-6 mb-6">
                  <div className="relative">
                    <img
                      src={`https:${current.condition.icon}`}
                      alt={current.condition.text}
                      className="w-28 h-28 weather-icon"
                    />
                    <div className="absolute -bottom-2 -right-2 glass-dark rounded-full p-2">
                      <svg className="w-4 h-4 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-8xl font-display font-black gradient-text leading-none">
                      {Math.round(current.temp_c)}°
                    </div>
                    <div className="text-white/60 text-lg mt-2 font-medium">
                      Feels like <span className="text-white">{Math.round(current.feelslike_c)}°C</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-3xl font-display font-bold text-white capitalize">
                    {current.condition.text}
                  </h2>
                  <div className="flex items-center gap-4 text-white/70">
                    <span className="text-sm font-medium">Today • {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex lg:flex-col gap-4">
                <div className="glass-dark rounded-3xl p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-white">{current.wind_kph}</div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">km/h Wind</div>
                </div>
                <div className="glass-dark rounded-3xl p-4 text-center min-w-[100px]">
                  <div className="text-2xl font-bold text-white">{current.humidity}%</div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">Humidity</div>
                </div>
                <div className="glass-dark rounded-3xl p-4 text-center min-w-[100px]">
                  <div className={`text-2xl font-bold ${getUVLevel(current.uv).color}`}>{getUVLevel(current.uv).level}</div>
                  <div className="text-white/60 text-xs uppercase tracking-wide">UV Index</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Weather Metrics Dashboard */}
        <div className="space-y-8">
          <h2 className="section-header">Atmospheric Conditions</h2>
          
          {/* Primary Metrics Grid */}
          <div className="dashboard-grid">
            <MetricCard
              title="Wind & Air"
              metrics={[
                { label: 'Wind Speed', value: `${current.wind_kph} km/h`, subtext: current.wind_dir },
                { label: 'Gusts', value: `${current.gust_kph} km/h`, trend: 'neutral' },
                { label: 'Pressure', value: `${current.pressure_mb} mb`, trend: 'stable' },
              ]}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              }
            />
            
            <MetricCard
              title="Visibility & Moisture"
              metrics={[
                { label: 'Humidity', value: `${current.humidity}%`, color: getAirQualityColor(current.humidity) },
                { label: 'Visibility', value: `${current.vis_km} km`, trend: 'good' },
                { label: 'Cloud Cover', value: `${current.cloud}%`, trend: 'neutral' },
              ]}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
            />
            
            <MetricCard
              title="Sun & Precipitation"
              metrics={[
                { label: 'UV Index', value: getUVLevel(current.uv).level, color: getUVLevel(current.uv).color },
                { label: 'Precipitation', value: `${current.precip_mm} mm`, trend: current.precip_mm > 0 ? 'rain' : 'clear' },
                { label: 'Day/Night', value: current.is_day ? 'Day' : 'Night', color: current.is_day ? 'text-yellow-400' : 'text-blue-400' },
              ]}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
          </div>
          
          {/* Temperature Comparison */}
          <div className="glass rounded-4xl p-8">
            <h3 className="text-xl font-semibold text-white mb-6">Temperature Analysis</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{Math.round(current.temp_c)}°C</div>
                <div className="text-white/60 text-sm">Current</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-300">{Math.round(current.feelslike_c)}°C</div>
                <div className="text-white/60 text-sm">Feels Like</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{Math.round(current.temp_f)}°F</div>
                <div className="text-white/60 text-sm">Fahrenheit</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-300">{Math.round(current.feelslike_f)}°F</div>
                <div className="text-white/60 text-sm">Feels Like °F</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface MetricCardProps {
  title: string;
  metrics: Array<{
    label: string;
    value: string;
    color?: string;
    subtext?: string;
    trend?: 'good' | 'neutral' | 'bad' | 'stable' | 'rain' | 'clear';
  }>;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, metrics, icon }) => {
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'good':
        return <div className="w-2 h-2 bg-green-400 rounded-full"></div>;
      case 'bad':
        return <div className="w-2 h-2 bg-red-400 rounded-full"></div>;
      case 'stable':
        return <div className="w-2 h-2 bg-blue-400 rounded-full"></div>;
      case 'rain':
        return <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>;
      case 'clear':
        return <div className="w-2 h-2 bg-green-400 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-white/40 rounded-full"></div>;
    }
  };

  return (
    <div className="metric-card group">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <div className="text-white/70 group-hover:text-white transition-colors">
          {icon}
        </div>
      </div>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/70 text-sm">{metric.label}</span>
                {metric.trend && getTrendIcon(metric.trend)}
              </div>
              <div className={`text-xl font-bold ${metric.color || 'text-white'}`}>
                {metric.value}
              </div>
              {metric.subtext && (
                <div className="text-white/50 text-xs mt-1">{metric.subtext}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WeatherDetail: React.FC<WeatherDetailProps> = ({ icon, label, value }) => {
  return (
    <div className="glass-dark rounded-2xl p-4 text-center hover-lift">
      <div className="text-white/70 mb-2 flex justify-center">
        {icon}
      </div>
      <div className="text-white/60 text-sm mb-1">{label}</div>
      <div className="text-white text-lg font-semibold">{value}</div>
    </div>
  );
};

interface WeatherDetailProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}