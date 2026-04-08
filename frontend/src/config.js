const LOCAL_WP_BASE_URL = 'http://localhost:8884';
const DEFAULT_ORDER_BASE_URL =
  'https://frankiesbreakfastburritos.toast.site/order/frankies-breakfast-burritos-28708-roadside-drive';

const normalizeUrl = (value) => value?.trim().replace(/\/$/, '') || '';

export const WP_BASE_URL = normalizeUrl(
  import.meta.env.VITE_WP_BASE_URL || (import.meta.env.DEV ? LOCAL_WP_BASE_URL : ''),
);

export const WP_API_ROOT = WP_BASE_URL ? `${WP_BASE_URL}/wp-json` : '';
export const WP_API_V2_ROOT = WP_API_ROOT ? `${WP_API_ROOT}/wp/v2` : '';
export const ORDER_BASE_URL = normalizeUrl(import.meta.env.VITE_ORDER_BASE_URL) || DEFAULT_ORDER_BASE_URL;

if (!WP_BASE_URL) {
  console.warn(
    'Missing VITE_WP_BASE_URL. WordPress-backed content will use local fallbacks until this is configured.',
  );
}
