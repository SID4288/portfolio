import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Mouse position
  const mouse = useRef({ x: 0, y: 0 });
  // Ring position
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(max-width: 900px)").matches) return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mouse.current.x}px`;
        cursorDotRef.current.style.top = `${mouse.current.y}px`;
      }
    };

    const updateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${ring.current.x}px`;
        cursorRingRef.current.style.top = `${ring.current.y}px`;
      }

      requestRef.current = requestAnimationFrame(updateRing);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(updateRing);

    // Initial position trick
    const onMouseOverInit = (e: MouseEvent) => {
      ring.current.x = e.clientX;
      ring.current.y = e.clientY;
      window.removeEventListener("mouseover", onMouseOverInit);
    };
    window.addEventListener("mouseover", onMouseOverInit);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOverInit);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    // Handle hover states
    const handleMouseOver = (e: MouseEvent) => {
      if (!cursorRingRef.current) return;
      const target = e.target as HTMLElement;

      const hoverEl = target.closest('[data-cursor="hover"], a, button');
      const viewEl = target.closest('[data-cursor="view"]');

      if (viewEl) {
        cursorRingRef.current.classList.add("view");
        cursorRingRef.current.classList.remove("hover");
      } else if (hoverEl) {
        cursorRingRef.current.classList.add("hover");
        cursorRingRef.current.classList.remove("view");
      } else {
        cursorRingRef.current.classList.remove("hover");
        cursorRingRef.current.classList.remove("view");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
