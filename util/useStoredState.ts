"use client";

import { useState, useEffect } from "react";

export default function useStoredState<T>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  // const [storedValue, setStoredValue] = useState<T>(
  //   (window.localStorage.getItem(key) as T) || defaultValue,
  // );

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue((item as T) || defaultValue);
    } catch (error) {
      setStoredValue(defaultValue);
    }
  }, []);

  const setValue = (value: T) => {
    setStoredValue(value);
    try {
      if (value === defaultValue) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, String(value));
      }
    } catch (error) {}
  };

  return [storedValue, setValue];
}
