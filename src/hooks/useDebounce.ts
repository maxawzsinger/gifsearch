import { useEffect, useMemo, useRef } from "react";

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export const useDebounce = <T extends (...args: any[]) => any>({
  callback,
  delayMS,
}: {
  callback: T;
  delayMS: number;
}) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (...args: Parameters<T>) => {
      if (ref.current) {
        return ref.current(...args);
      }
    };
    return debounce(func, delayMS);
  }, []);

  return debouncedCallback;
};
