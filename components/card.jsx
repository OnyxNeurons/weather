import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@onyx/ui";

const WeatherCard = ({ temperature }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">{temperature}°C</p>
        <p className="text-sm text-muted-foreground">Current Temperature</p>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
