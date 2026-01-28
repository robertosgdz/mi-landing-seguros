import React, { useState, useEffect } from 'react';

export default function QrModal() {
  // Estado del modal
  const [isOpen, setIsOpen] = useState(false);

  // Bloquea scroll al abrir modal
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Cierra modal con tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Botón QR */}
      <button 
        className="qr-download-button" 
        onClick={() => setIsOpen(true)}
        aria-label="Descargar app"
      >
        <div className="qr-download-button-content">
          <img 
            src="/qr-aseofi.svg" 
            alt="QR para descargar app" 
            className="qr-download-button-image"
            fetchpriority="high"
          />
        </div>
      </button>

      {/* Modal popup */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-200 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsOpen(false)} 
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeInUp"
            onClick={(e) => e.stopPropagation()} 
          >
            
            {/* Botón cerrar X */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0d203e] transition-colors duration-200"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Contenido del modal */}
            <div className="flex flex-col items-center gap-8 text-center pt-4">
              
              {/* QR */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <img 
                  src="/qr-aseofi.svg" 
                  alt="QR para descargar app" 
                  className="w-64 h-64 object-contain rounded-lg"
                />
              </div>

              {/* Texto */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[#0d203e]">DESCARGA LA APP</h3>
                <p className="text-gray-600 text-xl">
                  Escanea este código QR con tu teléfono para descargar nuestra aplicación
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Estilos */}
      <style>{`
        /* Botón QR */
        .qr-download-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.3s ease;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .qr-download-button:hover {
          transform: scale(1.05);
        }

        .qr-download-button:active {
          transform: scale(0.95);
        }

        /* Contenedor QR */
        .qr-download-button-content {
          position: relative;
        }

        /* Imagen QR */
        .qr-download-button-image {
          width: 200px;
          height: 200px;
          object-fit: contain;
          background: white;
          padding: 12px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .qr-download-button:hover .qr-download-button-image {
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
}
