import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCountdownTimerProps {
  initialSeconds: number;
  onExpire?: () => void;
  autoStart?: boolean;
}

export function useCountdownTimer({
  initialSeconds,
  onExpire,
  autoStart = false,
}: UseCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(autoStart);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  const start = useCallback((seconds?: number) => {
    if (typeof seconds === 'number') {
      setTimeLeft(seconds);
    }
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback((seconds: number = initialSeconds) => {
    setIsRunning(false);
    setTimeLeft(seconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsRunning(false);
          if (onExpireRef.current) {
            onExpireRef.current();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning]);

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTimeLeft,
  };
}
