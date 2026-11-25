import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// 每个用例后卸载渲染树，避免查询命中上一轮残留节点
afterEach(() => {
  cleanup();
});
