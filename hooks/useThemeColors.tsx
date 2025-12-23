'use client';
import { useState, useEffect } from 'react';

export function useThemeColors() {
  const [colors, setColors] = useState({
    foreground: '#000',
    border: '#e5e5e5',
    muted: '#717171',
    card: '#ffffff',
  });

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      const fg = getComputedStyle(root).getPropertyValue('--foreground').trim();
      const border = getComputedStyle(root).getPropertyValue('--border').trim();
      const muted = getComputedStyle(root).getPropertyValue('--muted').trim();
      const card = getComputedStyle(root).getPropertyValue('--card').trim();
      setColors({
        foreground: fg || '#000',
        border: border || '#e5e5e5',
        muted: muted || '#717171',
        card: card || '#ffffff',
      });
    };

    updateColors();

    // Listen for theme attribute changes
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  return colors;
}
