import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "./build",
		reportCompressedSize: false,
		chunkSizeWarningLimit: 3000,
		rollupOptions: {
			output: {
				assetFileNames: "static/[ext]/[name].[hash][extname]",
				chunkFileNames: "static/js/[name].[hash].chunk.js",
				entryFileNames: "static/js/[name].[hash].entry.js",
			},
		},
	},
	define: {
		"process.env": process.env,
	},
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: "globalThis",
			},
		},
	},
	publicDir: "./public",
	plugins: [
		react({
			// Use React plugin in all *.jsx and *.tsx files
			include: "**/*.{js,jsx,ts,tsx}",
		}),
	],
	resolve: {
		alias: {
			"./runtimeConfig": "./runtimeConfig.browser",
		},
		extensions: [".js", ".ts", ".jsx", ".tsx"],
	},
});
