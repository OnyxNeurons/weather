'use client';
import { useState, useEffect } from 'react';
import { constructMetadata } from "@onyx/core/utils/metadata";
import { Card, CardHeader, CardTitle, CardContent, DashboardShell, DashboardHeader } from "@onyx/ui"
import WeatherCard from "@onyx/neurons/weather/components/card"
import { getTemperature } from "@onyx/neurons/weather/utils/weather";

export const metadata = constructMetadata({
  title: "Weather"
});

export default function WeatherPage() {
  const [temperature, setTemperature] = useState<number | null>(null);
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const temp = await getTemperature(latitude, longitude);
          setTemperature(temp);
        } catch (error) {
          console.error('Error fetching temperature:', error);
        }
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <DashboardShell>
      <DashboardHeader heading="Weather" text="Get the weather"></DashboardHeader>
      <Card>
        <CardHeader>
          <CardTitle>Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {temperature !== null ? (
              <WeatherCard temperature={temperature} />
            ) : (
              <p>Loading weather data...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
