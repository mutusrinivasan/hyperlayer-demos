export function toSlug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function accountSlug(): string {
  return 'current-account';
}

export function jarSlug(jar: { name: string }): string {
  return toSlug(jar.name);
}
