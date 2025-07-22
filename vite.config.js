import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // 모든 IP에서 접근 허용
    port: 5173,        // 기본 포트 (원하면 변경 가능)
    strictPort: true   // 이미 사용 중이면 실패하도록 함 (선택)
  }
})

