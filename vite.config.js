import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // 네 백엔드 주소
        changeOrigin: true,
        // secure: false, // https → http로 보내는 경우 필요할 수 있음
      },
      // 필요하다면 '/uploads' 등 다른 경로도 추가 가능
    }
  }
})