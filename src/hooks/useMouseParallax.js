import { useEffect } from 'react';

/**
 * useMouseParallax
 * Tracks mouse position via requestAnimationFrame and updates CSS custom
 * properties directly on a target element. Bypasses React's render cycle so
 * mousemove never triggers a component re-render — the key to smooth parallax.
 */
export function useMouseParallax(targetRef, options = {}) {
  const {
    strength = 1,
    ease = 0.08,
    enabled = true,
  } = options;

  const state = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    raf: null,
  });

  useEffect(() => {
    if (!enabled) return;

    const el = targetRef.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;

    const onMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = ((e.clientX - cx) / cx) * strength;
      targetY = ((e.clientY - cy) / cy) * strength * 0.6;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const loop = () => {
      state.current.tx += (targetX - state.current.tx) * ease;
      state.current.ty += (targetY - state.current.ty) * ease;

      el.style.setProperty('--parallax-x', `${state.current.tx}px`);
      el.style.setProperty('--parallax-y', `${state.current.ty}px`);

      state.current.raf = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (state.current.raf) cancelAnimationFrame(state.current.raf);
    };
  }, [enabled, strength, ease]);

  return state;
}
