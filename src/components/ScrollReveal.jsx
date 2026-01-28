import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '' }) {
  // Referencia al elemento DOM y estado de visibilidad
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  // Observa cuando el elemento entra en pantalla
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Configura observer para detectar visibilidad
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Anima cuando entra en pantalla
          if (entry.isIntersecting) {
            setVisible(true);
          } else {
            // Se oculta al salir de pantalla
            setVisible(false);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Contenedor con animación
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
