# Weather App

A professional, responsive weather application built with React.js and TypeScript, featuring a modern design with Tailwind CSS.

## Features

- 🌤️ **Current Weather**: Real-time weather data for any location
- 📅 **5-Day Forecast**: Extended weather predictions
- ⏰ **Hourly Forecast**: Detailed hourly weather for today
- 📍 **Geolocation Support**: Automatic location detection
- 🔍 **Smart Search**: Search by city name or coordinates
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized loading and caching
- 🎨 **Modern UI**: Glass-morphism design with smooth animations

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **WeatherAPI** for weather data
- **Axios** for API calls
- **Custom Hooks** for state management
- **Responsive Design** principles

## Project Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── SearchBar.tsx
│   ├── WeatherCard.tsx
│   ├── ForecastCard.tsx
│   ├── ErrorMessage.tsx
│   └── LoadingSpinner.tsx
├── hooks/
│   ├── useWeather.ts
│   └── useGeolocation.ts
├── services/
│   └── weatherApi.ts
├── types/
│   └── weather.ts
├── App.tsx
├── index.tsx
└── index.css
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WeatherAPI key (free at [weatherapi.com](https://weatherapi.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your WeatherAPI key:
   ```
   REACT_APP_WEATHER_API_KEY=your_actual_api_key_here
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## API Integration

This app uses the [WeatherAPI](https://weatherapi.com/) service which provides:

- Current weather conditions
- 5-day weather forecast
- Hourly forecasts
- Location search
- Global coverage

### API Endpoints Used

- `/current.json` - Current weather data
- `/forecast.json` - Weather forecast data
- `/search.json` - Location search

## Features in Detail

### Weather Display
- Current temperature with "feels like" temperature
- Weather condition with icon
- Comprehensive weather metrics (humidity, wind, pressure, etc.)
- UV index and visibility information

### Forecast
- 5-day daily forecast with high/low temperatures
- Hourly forecast for the current day
- Rain probability indicators
- Weather condition icons

### Search & Location
- Text-based city search
- Coordinate-based search (lat, lon)
- Geolocation API integration
- Error handling for invalid locations

### User Experience
- Loading states with custom spinner
- Error messages with dismiss functionality
- Responsive design for all screen sizes
- Glass-morphism UI design
- Smooth transitions and animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading components
- Optimized API calls with proper error handling
- Efficient state management with custom hooks
- Minimal re-renders with React best practices

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- [WeatherAPI](https://weatherapi.com/) for providing the weather data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) team for the excellent library