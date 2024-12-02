import { createUrl } from "./util";
import { usePathname, useSearchParams } from "next/navigation";

export default function useUrlState<T extends string>(
  key: string,
  {
    defaultValue = "" as T,
    historyEntry = false,
  }: {
    defaultValue?: T;
    historyEntry?: boolean;
  } = {},
): [T, (newValue: T) => void] {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const value = (searchParams.get(key) ?? defaultValue) as T;

  const setValue = (newValue: T) => {
    const newParams = new URLSearchParams(searchParams);
    if (newValue === defaultValue) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(newValue));
    }

    const updateState = historyEntry
      ? window.history.pushState
      : window.history.replaceState;
    updateState(null, "", createUrl(pathname, newParams));
  };

  return [value, setValue];
}
