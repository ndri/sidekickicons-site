import { pushState, replaceState } from "$app/navigation";
import { createUrl } from "./util";

// SvelteKit's shallow routing doesn't update page.url, so the query string is tracked
// here instead. Call syncUrlState on mount and on popstate.
let search = $state("");

export function syncUrlState() {
  search = window.location.search;
}

export function urlState<T extends string>(
  key: string,
  {
    defaultValue = "" as T,
    historyEntry = false,
  }: {
    defaultValue?: T;
    historyEntry?: boolean;
  } = {},
) {
  return {
    get value() {
      return (new URLSearchParams(search).get(key) ?? defaultValue) as T;
    },
    set value(newValue: T) {
      const newParams = new URLSearchParams(search);
      if (newValue === defaultValue) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(newValue));
      }

      const updateState = historyEntry ? pushState : replaceState;
      updateState(createUrl(window.location.pathname, newParams), {});
      syncUrlState();
    },
  };
}
