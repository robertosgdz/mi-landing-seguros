import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function HeaderComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  const modalContent = (
    <div 
      className="fixed inset-0 z-9999 flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* FONDO OSCURO */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={() => setIsModalOpen(false)}
      ></div>

      {/* VENTANA DEL MODAL */}
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-scaleUp mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* 
           BOTÓN DE CERRAR (X) - ESTILO UNIFICADO
           - Eliminado: p-2, hover:bg-blue-50, rounded-full
           - Añadido: Estilo limpio idéntico a QrModal y SecureFeatures
        */}
        <button 
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#14549C] transition-colors duration-200"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* CONTENIDO */}
        <div className="text-center space-y-6 mt-2">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-[#14549C] shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div className="space-y-3">
            <h3 id="modal-title" className="text-2xl font-bold text-gray-900 leading-tight">
              Nuevos Seguros PyME
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Ahora con aseofi puedes asegurar la facturación de tu pequeña empresa con tarifas reducidas y cobertura del 90%.
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(false)}
            className="w-full bg-[#14549C] text-white py-3 rounded-xl font-semibold hover:bg-blue-900 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-900/20"
          >
            Entendido, gracias
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* BARRA SUPERIOR */}
      <div className="bg-white w-full border-b-2 border-[#14549C] relative z-50">
        <div className="w-full px-4 sm:px-6 lg:px-17.5 py-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group text-sm font-medium text-gray-800 hover:text-[#14549C] transition flex items-center justify-start gap-2"
          >
            <span>¡Lanzamos nuestros seguros para PyMES! Haz clic para saber más</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#14549C] transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {mounted && isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
}