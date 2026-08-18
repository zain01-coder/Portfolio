import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite's default asset list covers images/media/fonts but not 3D models,
  // so .glb/.gltf would otherwise be parsed as JavaScript.
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})
