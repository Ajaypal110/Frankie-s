import { useEffect, useState } from 'react';
import { WP_API_ROOT } from '../config';

export const useFrankiesResource = (path, fallbackData) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // If path doesn't start with a slash, assume /frankies/v1/
  const fullPath = path.startsWith('/') ? path : `/frankies/v1/${path}`;

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);

      try {
        if (!WP_API_ROOT) {
          throw new Error('Missing WordPress API base URL');
        }

        const response = await fetch(`${WP_API_ROOT}${fullPath}`);

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const result = await response.json();

        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setData(fallbackData);
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [fallbackData, fullPath]);

  return { data, loading, error };
};
