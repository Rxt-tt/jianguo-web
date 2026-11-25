/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  // 测试骨架（vitest）：不改动上面的构建配置
  test: {
    environment: 'jsdom',
    // 本机全局 NODE_ENV=production 会让 React 走生产构建（没有 act），
    // 这里显式指定 test，保证 Testing Library 正常工作
    env: { NODE_ENV: 'test' },
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    css: false,
    restoreMocks: true,
  },
});
