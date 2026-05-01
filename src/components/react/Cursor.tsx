import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        const rect = ringRef.current.getBoundingClientRect();
        const w = rect.width || 36;
        const h = rect.height || 36;
        ringRef.current.style.transform = `translate3d(${ringX - w / 2}px, ${ringY - h / 2}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const setCursor = (mode: string | null) => {
      if (mode) document.body.setAttribute('data-cursor', mode);
      else document.body.removeAttribute('data-cursor');
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-cursor-play]')) {
        setCursor('play');
        return;
      }
      if (
        target.closest('a, button, [data-cursor-link], [role="button"]')
      ) {
        setCursor('link');
        return;
      }
      setCursor(null);
    };

    window.addEventListener('mousemove', move, { passive: true });
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onOver);
      setCursor(null);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
