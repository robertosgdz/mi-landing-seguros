import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Se anima cuando entra en pantalla
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            // Si quieres que se oculte al salir, pon esto a true
            setVisible(false);
          }
        });
      },
      {
        threshold: 0.15,           // 15% visible
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={
        className +
        ' transition-all duration-500 ease-out ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')
      }
    >
      {children}
    </div>
  );
}
