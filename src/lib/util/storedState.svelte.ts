import { onMount } from "svelte";

export function storedState<T extends string>(key: string, defaultValue: T) {
  let storedValue = $state<T>(defaultValue);

  onMount(() => {
    try {
      const item = window.localStorage.getItem(key);
      storedValue = (item as T) || defaultValue;
    } catch (error) {
      storedValue = defaultValue;
    }
  });

  return {
    get value() {
      return storedValue;
    },
    set value(value: T) {
      storedValue = value;
      try {
        if (value === defaultValue) {
          window.localStorage.removeItem(key);
        } else {
          window.localStorage.setItem(key, value);
        }
      } catch (error) {}
    },
  };
}
