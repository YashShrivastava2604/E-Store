import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"; // <-- IMPORT path

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
		proxy: {
			"/api": {
				target: "http://localhost:5000",
			},
		},
	},
	resolve: {
		alias: {
			react: path.resolve("./node_modules/react"),
		},
	},
})
