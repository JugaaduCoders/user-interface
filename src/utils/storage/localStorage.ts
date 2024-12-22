export function setItem(key: string, value: any) {
  localStorage.setItem(key, value);
}

export function getItem(key: string) {
  const val = localStorage.getItem(key);
  if (val) return val;
  return undefined;
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}
