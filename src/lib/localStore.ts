import { browser } from '$app/env';
import { writable } from "svelte/store";


function saveToLocalStore(key: string) {
  return (value: any) => {
    if ([null, undefined].includes(value)) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }
}

export function localStore<T>(key: string, initialValue: T) {
  const store = writable<T>(initialValue);
  if (!browser) return store;

  const stored = localStorage.getItem(key)
  if (stored !== null) store.set(JSON.parse(stored));

  store.subscribe(saveToLocalStore(key));
  return store;
}
