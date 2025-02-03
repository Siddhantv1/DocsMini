import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/DocsMini/",
})
// echo 'import { defineConfig } from "vite";  
// import react from "@vitejs/plugin-react";  
// export default defineConfig({  
//   plugins: [react()],  
//   base: "/", // FUCKING SIMPLE  
// })' > vite.config.js  
