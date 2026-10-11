import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountdownTimer } from '@/hooks/useCountdownTimer';

describe('Timer Logic Unit Tests', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with the correct starting seconds', () => {
    const { result } = renderHook(() =>
      useCountdownTimer({ initialSeconds: 60, autoStart: false })
    );

    expect(result.current.timeLeft).toBe(60);
    expect(result.current.isRunning).toBe(false);
  });

  it('counts down second-by-second when running', () => {
    const { result } = renderHook(() =>
      useCountdownTimer({ initialSeconds: 60, autoStart: true })
    );

    expect(result.current.isRunning).toBe(true);

    // Advance 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current.timeLeft).toBe(55);

    // Advance another 10 seconds
    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(result.current.timeLeft).toBe(45);
  });

  it('triggers onExpire callback and stops when reaching 0 (60s image timer)', () => {
    const onExpireMock = vi.fn();
    const { result } = renderHook(() =>
      useCountdownTimer({ initialSeconds: 60, autoStart: true, onExpire: onExpireMock })
    );

    // Advance 60 seconds
    act(() => {
      vi.advanceTimersByTime(60000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(onExpireMock).toHaveBeenCalledTimes(1);
  });

  it('handles 30-second question timer timeout auto-fail flow', () => {
    const onQuestionTimeout = vi.fn();
    const { result } = renderHook(() =>
      useCountdownTimer({ initialSeconds: 30, autoStart: true, onExpire: onQuestionTimeout })
    );

    // Question running at 15s
    act(() => {
      vi.advanceTimersByTime(15000);
    });
    expect(result.current.timeLeft).toBe(15);
    expect(onQuestionTimeout).not.toHaveBeenCalled();

    // Reaching 30s deadline
    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(result.current.timeLeft).toBe(0);
    expect(onQuestionTimeout).toHaveBeenCalledTimes(1);
  });

  it('supports pause and manual reset', () => {
    const { result } = renderHook(() =>
      useCountdownTimer({ initialSeconds: 30, autoStart: true })
    );

    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(result.current.timeLeft).toBe(20);

    // Pause timer
    act(() => {
      result.current.pause();
    });
    expect(result.current.isRunning).toBe(false);

    // Advance time while paused
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.timeLeft).toBe(20);

    // Reset timer
    act(() => {
      result.current.reset(30);
    });
    expect(result.current.timeLeft).toBe(30);
  });
});
