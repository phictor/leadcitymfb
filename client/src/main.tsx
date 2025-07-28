import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import source protection for production builds
if (import.meta.env.PROD) {
  import("./lib/source-protection");
}

createRoot(document.getElementById("root")!).render(<App />);
