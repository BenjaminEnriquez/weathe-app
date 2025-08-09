import React, { useState } from 'react';
import { ForecastDay } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFullDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return today.toDateString() === date.toDateString();
  };

  const getTempRange = () => {
    const temps = forecast.map(day => [day.day.mintemp_c, day.day.maxtemp_c]).flat();
    return { min: Math.min(...temps), max: Math.max(...temps) };
  };

  const getTempBarWidth = (temp: number, range: { min: number; max: number }) => {
    return ((temp - range.min) / (range.max - range.min)) * 100;
  };

  const tempRange = getTempRange();

  return (
    <div className="w-full max-w-7xl mx-auto mt-12 space-y-8 animate-slide-up">
      {/* 5-Day Overview */}
      <div className="card-professional p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-header mb-0">Extended Forecast</h2>
          <div className="status-indicator">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 font-medium">5 Days</span>
          </div>
        </div>
        {/* Enhanced Daily Forecast Cards */}
        <div className="space-y-4">
          {forecast.map((day, index) => (
            <div
              key={day.date}
              onClick={() => setSelectedDay(index)}
              className={`glass-dark rounded-4xl p-6 transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                selectedDay === index ? 'ring-2 ring-white/20 bg-white/15' : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* Date and Status */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className={`font-bold text-lg ${
                      isToday(day.date) ? 'text-primary-300' : 'text-white'
                    }`}>
                      {isToday(day.date) ? 'Today' : formatDate(day.date)}
                    </div>
                    {isToday(day.date) && (
                      <div className="text-xs text-primary-400 font-medium">Current</div>
                    )}
                  </div>
                  
                  {/* Weather Icon and Condition */}
                  <div className="flex items-center gap-3">
                    <img
                      src={`https:${day.day.condition.icon}`}
                      alt={day.day.condition.text}
                      className="w-16 h-16 weather-icon"
                    />
                    <div>
                      <div className="text-white font-medium capitalize text-lg">
                        {day.day.condition.text}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          {day.day.daily_chance_of_rain}%
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                          {day.day.maxwind_kph} km/h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Temperature Range with Visual Bar */}
                <div className="flex items-center gap-6">
                  <div className="hidden lg:flex items-center gap-3">
                    <span className="text-white/60 text-sm w-8 text-right">{Math.round(day.day.mintemp_c)}°</span>
                    <div className="relative w-24 h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
                        style={{
                          marginLeft: `${getTempBarWidth(day.day.mintemp_c, tempRange)}%`,
                          width: `${getTempBarWidth(day.day.maxtemp_c, tempRange) - getTempBarWidth(day.day.mintemp_c, tempRange)}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-white text-sm w-8">{Math.round(day.day.maxtemp_c)}°</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {Math.round(day.day.maxtemp_c)}°
                    </div>
                    <div className="text-white/60">
                      {Math.round(day.day.mintemp_c)}°
                    </div>
                  </div>
                  
                  {/* Expand indicator */}
                  <div className="text-white/40">
                    <svg className={`w-5 h-5 transition-transform duration-300 ${
                      selectedDay === index ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Expanded Details */}
              {selectedDay === index && (
                <div className="mt-6 pt-6 border-t border-white/10 animate-slide-down">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Humidity</div>
                      <div className="text-white font-semibold">{day.day.avghumidity}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/60 text-xs uppercase tracking-wide mb-1">UV Index</div>
                      <div className="text-primary-400 font-semibold">{day.day.uv}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Sunrise</div>
                      <div className="text-white font-semibold">{day.astro.sunrise}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white/60 text-xs uppercase tracking-wide mb-1">Sunset</div>
                      <div className="text-white font-semibold">{day.astro.sunset}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
      
      {/* Detailed Hourly Forecast */}
      {forecast.length > 0 && selectedDay === 0 && (
        <div className="card-professional p-8">
          <h3 className="section-header">Today's Hourly Forecast</h3>
          
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-4 min-w-max">
              {forecast[0].hour
                .filter((_, index) => index % 2 === 0)
                .slice(0, 12)
                .map((hour, index) => (
                <div
                  key={hour.time}
                  className="glass-dark rounded-3xl p-4 text-center min-w-[100px] hover-lift"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-white/60 text-sm font-medium mb-3">
                    {new Date(hour.time).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true,
                    })}
                  </div>
                  
                  <div className="mb-3">
                    <img
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                      className="w-10 h-10 mx-auto weather-icon"
                    />
                  </div>
                  
                  <div className="text-white text-lg font-bold mb-2">
                    {Math.round(hour.temp_c)}°
                  </div>
                  
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-center gap-1 text-white/50">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                      <span>{hour.chance_of_rain}%</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-1 text-white/50">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span>{hour.wind_kph}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 glass-dark rounded-3xl">
            <div className="text-center text-white/60 text-sm">
              ← Scroll horizontally to see more hours →
            </div>
          </div>
        </div>
      )}
    </div>
  );
};