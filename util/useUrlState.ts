import { createUrl } from "./util";
import { useRouter, useSearchParams } from "next/navigation";

export default function useUrlState<T extends string>(
  key: string,
  defaultValue = "" as T,
  path = "/",
): [T, (newValue: T) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = (searchParams.get(key) ?? defaultValue) as T;

  const setValue = (newValue: T) => {
    const newParams = new URLSearchParams(searchParams);
    if (newValue === defaultValue) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(newValue));
    }
    router.replace(createUrl(path, newParams));
  };

  return [value, setValue];
}
