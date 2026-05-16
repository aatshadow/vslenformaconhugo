export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const asset = (p: string) => {
  const path = p.startsWith('/') ? p : `/${p}`;
  return `${BASE_PATH}${path}`;
};
