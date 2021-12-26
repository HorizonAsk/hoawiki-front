export function localGet(key: string): string | null {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return value;
  }
}

export function localSet(key: string, value: string): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function localRemove(key: string): void {
  window.localStorage.removeItem(key);
}
