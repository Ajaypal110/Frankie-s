import { useFrankiesResource } from './useFrankiesResource';

export const useGlobalData = () => {
  const { data, loading, error } = useFrankiesResource('/global-settings', null);
  return { globalData: data, loading, error };
};
