import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from '@tailwindcss/vite'
import { config } from "dotenv";

config();

export default defineConfig({
  root: "./frontend",
  plugins: [tailwindcss() as any, react(), tsconfigPaths()],
  define: {
    'import.meta.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT || '4242'),
  },
});
