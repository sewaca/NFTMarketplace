import ReactDOM from "react-dom/client";
import "./global.css";
// Шрифты
import "@fontsource/roboto";
import "@fontsource/space-grotesk";
import { hydrate } from "react-dom";
import { AppProviders } from "./AppProviders";
// SLICK-CAROUSEL CSS FILES:
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

// react snap
if (container.hasChildNodes()) {
  hydrate(<AppProviders />, container);
} else {
  root.render(<AppProviders />);
}
