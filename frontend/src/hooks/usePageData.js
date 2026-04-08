import { useFrankiesResource } from './useFrankiesResource';

export const usePageData = (slug, fallbackData = null) =>
  useFrankiesResource(`/page/${slug}`, fallbackData);
