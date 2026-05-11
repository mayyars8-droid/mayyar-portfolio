import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
  href?: string;
  className?: string;
  strength?: number;
  style?: CSSProperties;
  target?: '_blank' | '_self';
  rel?: string;
};

export default function MagneticButton({
  children,
  href,
  className = '',
  strength = 0.35,
  style,
  target,
  rel,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: Event) => {
      const me = e as MouseEvent;
      const rect = el.getBoundingClientRect();
      const x = me.clientX - rect.left - rect.width / 2;
      const y = me.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const reset = () => {
      el.style.transform = 'translate3d(0,0,0)';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', reset);
    };
  }, [strength]);

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={`inline-block transition-transform duration-300 ease-out ${className}`}
        style={style}
        data-cursor-link
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      style={style}
      data-cursor-link
    >
      {children}
    </button>
  );
}
