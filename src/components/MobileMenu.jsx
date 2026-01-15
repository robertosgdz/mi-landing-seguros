import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function MobileMenu({ showQr = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear scroll al abrir
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* CONTENEDOR SUPERIOR: LOGIN + HAMBURGUESA (solo mobile/tablet) */}
      <div className="lg:hidden flex items-center gap-3">
        
        {/* ICONO LOGIN → /login (DOS SVGs: uno blanco, uno azul) */}
        <a
          href="/login"
          aria-label="Iniciar sesión"
          className="transition-transform duration-300 ease-out p-1 transform hover:-translate-y-1"
        >
          {/* SVG BLANCO */}
          <svg
            id="mobile-login-icon-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 w-8"
            fill="#ffffff"
          >
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>

          {/* SVG AZUL (inicialmente oculto) */}
          <svg
            id="mobile-login-icon-blue"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-8 w-8 hidden"
            fill="#0d203e"
          >
            <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
          </svg>
        </a>

        {/* BOTÓN HAMBURGUESA */}
        <button
          onClick={() => setIsOpen(true)}
          className="mobile-menu-btn text-white text-4xl focus:outline-none transition-transform duration-700 ease-in-out p-2 transform hover:-translate-y-1"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* MENÚ PANTALLA COMPLETA */}
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-99999 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fadeIn"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Cajón */}
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col p-6 animate-slideInRight overflow-y-auto">
            {/* Cabecera - LOGO EN VEZ DE TEXTO */}
            <div className="flex justify-between items-center mb-10">
              <img
                src="/logo_aseofi.png"
                alt="ASEOFI Logo"
                className="h-12"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-[#14549C] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col space-y-6">
              <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-xl font-medium text-gray-800 hover:text-[#14549C] transition-colors">Cómo funciona</a>
              <a href="#faq" onClick={() => setIsOpen(false)} className="text-xl font-medium text-gray-800 hover:text-[#14549C] transition-colors">Preguntas</a>
              <a href="#specialists" onClick={() => setIsOpen(false)} className="text-xl font-medium text-gray-800 hover:text-[#14549C] transition-colors">Equipo</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="text-xl font-medium text-gray-800 hover:text-[#14549C] transition-colors">Contáctanos</a>
            </nav>

            {/* FOOTER - INFORMACIÓN LEGAL */}
            <div className="mt-auto pt-6 pb-4 border-t border-gray-200">
              <div className="text-center space-y-2">
                <p className="text-sm font-semibold text-gray-700">© aseofi 2026</p>
                <p className="text-xs text-gray-600">DIEGOCOR, Correduría de Seguros, S.L.</p>
                <p className="text-xs text-gray-600">CDGS: J-3021 | Avda. Victoria, 6 Bajo</p>
                <p className="text-xs text-gray-600">30007, Murcia, España</p>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideInRight { animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </>
  );
}
