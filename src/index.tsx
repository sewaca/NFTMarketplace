import ReactDOM from "react-dom/client";
import "./global.css";
// Шрифты
import "@fontsource/roboto";
import "@fontsource/space-grotesk";
import { hydrate } from "react-dom";
import { AppProviders } from "./AppProviders";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

// react snap
if (container.hasChildNodes()) {
  hydrate(<AppProviders />, container);
} else {
  root.render(<AppProviders />);
}
