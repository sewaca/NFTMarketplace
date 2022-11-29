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

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

// react snap
// if (container.hasChildNodes()) {
//   hydrate(<AppProviders />, container);
// } else {
root.render(<AppProviders />);
// }
