import { createRoot } from "react-dom/client";
import WeatherPage from "./components/weather-page";
import { createElement } from "react";

export const pages = (OnyxSDK: any) => {
  const root = document.createElement("div");
  Object.assign(root.style, {
    height: "100%",
    width: "100%",
  });

  root.id = 'neuron-weather-page'

  const app = createRoot(root);
  app.render(createElement(WeatherPage, { OnyxSDK }));

  return [
    {
      path: '/',
      componentName: 'WeatherPage', 
      component: () => root,
    },
  ]
}