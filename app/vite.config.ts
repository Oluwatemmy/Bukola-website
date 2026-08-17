import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Hosts allowed to reach the dev/preview server through a tunnel. */
const TUNNEL_HOSTS = [
  "smooth-radically-kitten.ngrok-free.app",
  ".ngrok-free.app", // a leading dot allows any subdomain, for new tunnels
  ".ngrok.io",
  ".trycloudflare.com",
];

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const tunnelled = mode === "tunnel";

  return {
    plugins: [react()],

    server: {
      // Listen on every interface so the tunnel (and your LAN) can reach it.
      host: true,
      port: 5173,
      allowedHosts: TUNNEL_HOSTS,
      cors: true,
      /* Through ngrok the page is served over https on port 443, so the HMR
         websocket has to be told to connect there instead of :5173. Only
         applied in tunnel mode, so plain `npm run dev` on localhost is
         unaffected. */
      ...(tunnelled ? { hmr: { protocol: "wss", clientPort: 443 } } : {}),
    },

    preview: {
      host: true,
      port: 4173,
      allowedHosts: TUNNEL_HOSTS,
      cors: true,
    },
  };
});
