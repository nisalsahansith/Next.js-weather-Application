"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const searchWeather = async () => {
    if (!city) return;

    setLoading(true);
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    setWeather(data);
    setLoading(false);
  };

  const getWeatherEmoji = (code: number, temp: number) => {
    if (temp <= -20) return "🥶 Extreme Cold";

    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
      return "❄️ Snow";
    }

    if (code >= 51 && code <= 67) {
      return "🌧️ Rainy";
    }

    if (code >= 45 && code <= 48) {
      return "🌫️ Foggy";
    }

    if (code >= 1 && code <= 3) {
      return "⛅ Partly Cloudy";
    }

    if (code === 0) {
      return "☀️ Clear Sky";
    }

    return "🌤️ Weather";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-gray-950 p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center text-white tracking-wide">
          🌍 Weather App
        </h1>

        <div className="flex gap-2 bg-white/10 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-xl">
          <Input
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent border-none text-white placeholder:text-white/50 focus-visible:ring-0"
          />
          <Button
            onClick={searchWeather}
            className="rounded-xl bg-white text-black hover:bg-gray-300"
          >
            {loading ? "Loading..." : "Search"}
          </Button>
        </div>

        {weather && !weather.error && (
          <Card className="p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl text-white text-center space-y-4">
            <h2 className="text-xl font-semibold text-white/90">
              📍 {weather.location}
            </h2>

            <div className="text-2xl font-medium">
              {getWeatherEmoji(
                weather.current.weather_code,
                weather.current.temperature_2m
              )}
            </div>

            <p className="text-5xl font-bold">
              {weather.current.temperature_2m}°C
            </p>

            <div className="flex justify-around text-sm mt-4 text-white/80">
              <div>
                💨 Wind
                <p>{weather.current.wind_speed_10m} km/h</p>
              </div>
              <div>
                🌡️ Status
                <p>Live</p>
              </div>
            </div>
          </Card>
        )}

        {weather?.error && (
          <p className="text-red-400 text-center">{weather.error}</p>
        )}
      </div>
    </div>
  );
}