import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Datos de las características (4 pasos del proceso)
const featuresData = [
  {
    id: 1,
    title: "Registra tu Solicitud",
    short: "Completa tus datos y crea una solicitud de aseguramiento para una factura específica. Incluye información del deudor y detalles de la operación a crédito.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Espera la Cotización",
    short: "Tu solicitud entra en estado 'Pendiente de Cotización'. Una aseguradora de primer nivel la revisa y prepara una oferta con cuota y porcentaje de aseguramiento.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Revisa la Oferta",
    short: "Recibes la oferta con el importe de la cuota (precio del seguro) y el porcentaje asegurado. Revisa los detalles cuidadosamente antes de decidir.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Acepta o Rechaza",
    short: "Si aceptas la oferta, comienza el proceso de contratación. Si la rechazas, puedes crear una nueva solicitud cuando lo necesites.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.789 1.106H2a2 2 0 01-2-2V8a2 2 0 012-2h15.764a2 2 0 011.789 2.894l-1.894 3.776" />
      </svg>
    )
  }
];

export default function SecureFeatures() {
  
  // Estado del modal y verificación de montaje
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Marca el componente como montado en cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquea scroll al abrir/cerrar modal
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
      {/* Lista de características (4 pasos) */}
      <div className="flex flex-col gap-4 justify-center">
        
        {featuresData.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setIsOpen(true)}
            className="group flex items-start justify-between w-full text-left py-2 px-0 hover:transform-none! transition-opacity duration-300"
          >
            
            {/* Texto: título + descripción */}
            <div className="text-xl leading-relaxed pr-6">
              
              <span className="font-bold text-gray-900 group-hover:text-[#14549C] transition-colors">
                {feature.title}
              </span>
              
              <span> </span>
              
              <span className="text-gray-500 group-hover:text-gray-600">
                {feature.short}
              </span>
            </div>

            {/* Icono flecha derecha */}
            <div className="shrink-0 transition-all transform group-hover:translate-x-2 text-[#14549C] mt-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
        
      </div>

      {/* Modal popup con detalles del proceso */}
      {mounted && isOpen && createPortal(
        
        <div 
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-8 md:p-12 relative animate-scaleUp mx-4 max-h-[90vh] overflow-y-auto"
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

            {/* Contenido principal del modal */}
            <div className="text-left mt-4">
              
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 tracking-tight">
                El Proceso aseofi® Paso a Paso
              </h2>
              
              <div className="flex flex-col gap-12">
                
                {/* Paso 1: Solicitud */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  <div className="text-lg font-bold text-black">
                    Paso 1: Solicitud
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    Registra una solicitud de aseguramiento para una factura específica. 
                    Proporciona los datos del deudor (nombre, NIF, actividad, domicilio) 
                    y los detalles de la factura (importe, fecha, vencimiento).
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    Tu solicitud entra inmediatamente en estado "Pendiente de Cotización". 
                    No hay costes en este paso, solo aguardas a que la aseguradora revise tu operación.
                  </div>
                </div>

                {/* Paso 2: Cotización */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  <div className="text-lg font-bold text-black">
                    Paso 2: Cotización
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    Una aseguradora de primer nivel analiza tu solicitud y prepara una oferta de seguro. 
                    La oferta incluye las condiciones de aseguramiento: el importe de la cuota (precio del seguro) 
                    y el porcentaje de la factura que se asegura.
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    La oferta se calcula basándose en el perfil de riesgo del deudor. 
                    Como empresa o autónomo, en aseofi®, no estás obligado a asegurar toda tu cartera.
                  </div>
                </div>

                {/* Paso 3: Revisión */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  <div className="text-lg font-bold text-black">
                    Paso 3: Revisión
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    Recibes la oferta con: la aseguradora, el importe de la cuota, 
                    el porcentaje asegurado, la fecha de la oferta y el estado.
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    Tienes total libertad para evaluar si la oferta te interesa. 
                    No hay penalizaciones por revisar múltiples ofertas o cambiar de opinión.
                  </div>
                </div>

                {/* Paso 4: Decisión */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  <div className="text-lg font-bold text-black">
                    Paso 4: Decisión
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    Si aceptas la oferta, comienza el proceso de contratación. 
                    Tu factura queda asegurada y protegida contra el riesgo de impago.
                  </div>
                  
                  <div className="text-base text-gray-800 leading-relaxed">
                    Si rechazas, el estado de la solicitud cambia a "Rechazada". 
                    Puedes crear una nueva solicitud en cualquier momento sin limitaciones.
                  </div>
                </div>

              </div>

            </div>
            
          </div>
          
        </div>,
        document.body
      )}
      
      {/* Animaciones */}
      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        
        @keyframes scaleUp { 
          from { 
            transform: scale(0.98) translateY(10px); 
            opacity: 0; 
          } 
          to { 
            transform: scale(1) translateY(0); 
            opacity: 1; 
          } 
        }
        
        .animate-fadeIn { 
          animation: fadeIn 0.2s ease-out forwards; 
        }
        
        .animate-scaleUp { 
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
    </>
  );
}
