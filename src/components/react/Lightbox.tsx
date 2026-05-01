import { useEffect, useState } from 'react';

type Detail = {
  type: 'youtube' | 'image' | 'video';
  src: string;
  title: string;
  category?: string;
  vertical?: boolean;
};

export default function Lightbox() {
  const [detail, setDetail] = useState<Detail | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const e = event as CustomEvent<Detail>;
      setDetail(e.detail);
    };
    window.addEventListener('lightbox:open', handler as EventListener);
    return () => window.removeEventListener('lightbox:open', handler as EventListener);
  }, []);

  useEffect(() => {
    if (!detail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetail(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [detail]);

  if (!detail) return null;

  const aspect = detail.vertical ? '9/16' : '16/9';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 backdrop-blur-md p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={detail.title}
      onClick={() => setDetail(null)}
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-cream text-ink hover:bg-coral hover:text-cream transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setDetail(null);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 6l12 12" />
          <path d="M18 6l-12 12" />
        </svg>
      </button>

      <div
        className="relative max-w-[1200px] w-full"
        style={{ aspectRatio: aspect, maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-10 left-0 right-0 flex items-center justify-between text-cream/85">
          <p className="font-display text-lg sm:text-2xl">{detail.title}</p>
          {detail.category && (
            <p className="font-mono text-xs tracking-[0.25em] text-cream/55 uppercase">
              {detail.category}
            </p>
          )}
        </div>

        <div className="w-full h-full overflow-hidden rounded-2xl bg-ink shadow-2xl mx-auto"
             style={{ maxHeight: '90vh', aspectRatio: aspect }}>
          {detail.type === 'youtube' ? (
            <iframe
              src={`${detail.src}?autoplay=1&rel=0`}
              title={detail.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full block"
            />
          ) : detail.type === 'video' ? (
            <video
              src={detail.src}
              title={detail.title}
              controls
              autoPlay
              playsInline
              className="w-full h-full block bg-ink"
            />
          ) : (
            <img
              src={detail.src}
              alt={detail.title}
              className="w-full h-full object-contain bg-ink"
            />
          )}
        </div>
      </div>
    </div>
  );
}
