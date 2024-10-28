import { useEffect, useState } from "react";
import { getTemperature } from "../lib/weather";

function WeatherPage({ OnyxSDK }: { OnyxSDK: any }) {
  const { Card, CardContent, CardHeader, CardTitle, DashboardShell } =
    OnyxSDK.ui;
  const [temperature, setTemperature] = useState(0);  
  
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
    <DashboardShell heading="Weather" text="Get the latest weather">
      <Card>
        <CardHeader>
          <CardTitle>Today's Weather</CardTitle>
        </CardHeader>
        <CardContent>
        <p className="text-3xl font-bold">{temperature}°C</p>
        <p className="text-sm text-muted-foreground">Current Temperature</p>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}

export default WeatherPage;
