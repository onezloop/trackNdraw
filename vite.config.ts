import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this app from the /trackNdraw/ sub-path, not the domain root.
  base: "/trackNdraw/",
  // Camera access (getUserMedia) only works in a "secure context": https://
  // or http://localhost. basicSsl serves the dev server over a self-signed
  // HTTPS certificate so the camera also works when opened from another
  // device on the LAN via this machine's IP address.
  plugins: [react(), basicSsl()],
  server: {
    host: true,
  },
  build: {
    outDir: "docs",
  },
});
