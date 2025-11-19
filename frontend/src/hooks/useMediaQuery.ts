import { useState, useEffect } from 'react';

/**
 * Custom React hook for evaluating a CSS media query.
 *
 * @param {string} query - The CSS media query string to evaluate (e.g. '(max-width: 768px)').
 * @returns {boolean} Returns true if the document currently matches the media query, false otherwise.
 *
 * @example
 *   const isMobile = useMediaQuery('(max-width: 768px)');
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Set initial value
    setMatches(media.matches);

    // Handler for "change" event of the MediaQueryList
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

/**
 * Hook that returns true if the current viewport width is considered "mobile" (<= 768px).
 *
 * @returns {boolean}
 *
 * @example
 *   const isMobile = useIsMobile();
 */
export const useIsMobile = (): boolean => useMediaQuery('(max-width: 768px)');

/**
 * Hook that returns true if the current viewport width is considered "tablet" (769px - 1024px).
 *
 * @returns {boolean}
 *
 * @example
 *   const isTablet = useIsTablet();
 */
export const useIsTablet = (): boolean => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

/**
 * Hook that returns true if the current viewport width is considered "desktop" (>= 1025px).
 *
 * @returns {boolean}
 *
 * @example
 *   const isDesktop = useIsDesktop();
 */
export const useIsDesktop = (): boolean => useMediaQuery('(min-width: 1025px)');