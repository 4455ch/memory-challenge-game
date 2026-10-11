import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock canvas-confetti in JSDOM environment
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
  __esModule: true,
}));
