import ReactDOM from "react-dom/client";
import { AppProviders } from "./AppProviders";
// Шрифты
import "@fontsource/roboto";
import "@fontsource/space-grotesk";
// CSS:
import "./assets/global.css";
// SLICK-CAROUSEL CSS FILES:
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./assets/slick_customization.global.css";
import React from "react";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AppProviders />
  </React.StrictMode>
);
