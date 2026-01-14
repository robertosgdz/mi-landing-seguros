// IMPORTACIONES DE REACT
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';


// ============================================
// DATOS DE CARACTERÍSTICAS (Basados en el PDF)
// ============================================
// Array con 4 pasos del proceso de ASEOFI
// Cada objeto contiene: id, título, descripción corta e icono SVG
const featuresData = [
  {
    id: 1,
    // Paso 1: Registro y Solicitud
    title: "Registra tu Solicitud",
    // Del PDF: "el cliente o tomador del seguro, registraría una solicitud de aseguramiento de una factura"
    short: "Completa tus datos y crea una solicitud de aseguramiento para una factura específica. Incluye información del deudor y detalles de la operación a crédito.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: 2,
    // Paso 2: Espera de Cotización
    title: "Espera la Cotización",
    // Del PDF: "entraría a la espera a que una asegurado, observe esa solicitud y pueda realizar una oferta de seguro"
    short: "Tu solicitud entra en estado 'Pendiente de Cotización'. Una aseguradora de primer nivel la revisa y prepara una oferta con cuota y porcentaje de aseguramiento.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 3,
    // Paso 3: Revisión de Oferta
    title: "Revisa la Oferta",
    // Del PDF: "indicando una cuota del seguro, cuánto costaría y qué porcentaje del importe de la factura se aseguraría"
    short: "Recibes la oferta con el importe de la cuota (precio del seguro) y el porcentaje asegurado. Revisa los detalles cuidadosamente antes de decidir.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 4,
    // Paso 4: Aceptación o Rechazo
    title: "Acepta o Rechaza",
    // Del PDF: "el cliente o tomador del seguro, puede aceptar o rechazar esa solicitud, en caso de aceptarla, empezaría el proceso de contratación"
    short: "Si aceptas la oferta, comienza el proceso de contratación con una aseguradora de primer nivel. Si la rechazas, puedes crear una nueva solicitud cuando lo necesites.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.646 7.23a2 2 0 01-1.789 1.106H2a2 2 0 01-2-2V8a2 2 0 012-2h15.764a2 2 0 011.789 2.894l-1.894 3.776" />
      </svg>
    )
  }
];


// ============================================
// COMPONENTE REACT: CARACTERÍSTICAS SEGURAS
// ============================================
export default function SecureFeatures() {
  
  // Estado: Controla si el modal está abierto (true) o cerrado (false)
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado: Verifica si el componente está montado en el DOM (necesario para portal)
  const [mounted, setMounted] = useState(false);


  // ============================================
  // EFFECT 1: Marca el componente como montado (cliente-side)
  // ============================================
  useEffect(() => {
    setMounted(true);
  }, []);


  // ============================================
  // EFFECT 2: Bloquea/desbloquea el scroll del body cuando modal abre/cierra
  // ============================================
  // Cuando isOpen = true: Bloquea scroll del body (document.body.style.overflow = 'hidden')
  // Cuando isOpen = false: Restaura scroll del body (document.body.style.overflow = '')
  useEffect(() => {
    if (isOpen) {
      // Modal abierto: bloquea el scroll para enfoque total
      document.body.style.overflow = 'hidden';
    } else {
      // Modal cerrado: restaura el scroll normal
      document.body.style.overflow = '';
    }
    
    // Cleanup: Restaura scroll al desmontar componente
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);



  return (
    <>
      {/* ============================================
          LISTA DE CARACTERÍSTICAS (4 PASOS)
          ============================================ */}
      <div className="flex flex-col gap-4 justify-center">
        
        {/* Mapea cada característica del array featuresData */}
        {featuresData.map((feature) => (
          <button
            key={feature.id}
            // onClick abre el modal cuando se hace clic en cualquier paso
            onClick={() => setIsOpen(true)}
            // Estilos del botón: flex horizontal, espaciado, transiciones suaves
            className="group flex items-start justify-between w-full text-left py-2 px-0 hover:transform-none! transition-opacity duration-300"
          >
            
            {/* CONTENEDOR DE TEXTO (Título + Descripción) */}
            <div className="text-xl leading-relaxed pr-6">
              
              {/* TÍTULO DEL PASO (Negrita, azul al pasar ratón) */}
              <span className="font-bold text-gray-900 group-hover:text-[#14549C] transition-colors">
                {feature.title}
              </span>
              
              {/* ESPACIO */}
              <span> </span>
              
              {/* DESCRIPCIÓN CORTA (Gris, cambia al pasar ratón) */}
              <span className="text-gray-500 group-hover:text-gray-600">
                {feature.short}
              </span>
            </div>


            {/* ICONO DE FLECHA DERECHA (SIEMPRE VISIBLE) */}
            {/* Removido: opacity-0 group-hover:opacity-100 */}
            {/* Añadido: transform group-hover:translate-x-2 = se desplaza solo al hover */}
            <div className="shrink-0 transition-all transform group-hover:translate-x-2 text-[#14549C] mt-1">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
        
      </div>



      {/* ============================================
          MODAL POPUP (Contenido Detallado del Proceso)
          ============================================ */}
      {/* Renderiza solo si: mounted=true Y isOpen=true */}
      {/* createPortal = Renderiza en document.body (fuera del árbol normal) */}
      {mounted && isOpen && createPortal(
        
        // CONTENEDOR EXTERNO (Fondo oscuro + backdrop blur)
        <div 
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          // onClick en el fondo cierra el modal
          onClick={() => setIsOpen(false)}
        >
          
          {/* CONTENEDOR MODAL (Caja blanca, sombra, redondeada) */}
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-5xl p-8 md:p-12 relative animate-scaleUp mx-4 max-h-[90vh] overflow-y-auto"
            // onClick.stopPropagation = Evita que clics en el modal cierren el modal
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* ============================================
                BOTÓN CERRAR (X) ESQUINA SUPERIOR DERECHA
                ============================================ */}
            <button 
              onClick={() => setIsOpen(false)}
              // Estilos: gris por defecto, azul al pasar ratón
              className="absolute top-4 right-4 text-gray-400 hover:text-[#0d203e] transition-colors duration-200"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>



            {/* ============================================
                CONTENIDO PRINCIPAL DEL MODAL
                ============================================ */}
            <div className="text-left mt-4">
              
              {/* TÍTULO DEL MODAL */}
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 tracking-tight">
                El Proceso aseofi Paso a Paso
              </h2>
              
              {/* GRID UNIFICADO con todos los pasos explicados (Basado en PDF) */}
              {/* flex flex-col gap-12 = Filas apiladas verticalmente con 48px separación */}
              <div className="flex flex-col gap-12">
                
                {/* ============================================
                    FILA 1: PASO 1 - SOLICITUD
                    ============================================ */}
                {/* grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] = 1 columna móvil, 3 columnas desktop */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  {/* ETIQUETA: "Solicitud" */}
                  <div className="text-lg font-bold text-black">
                    Paso 1: Solicitud
                  </div>
                  
                  {/* COLUMNA IZQUIERDA: Descripción rápida */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    Registra una solicitud de aseguramiento para una factura específica. 
                    Proporciona los datos del deudor (nombre, NIF, actividad, domicilio) 
                    y los detalles de la factura (importe, fecha, vencimiento).
                  </div>
                  {/* Nota: Contenido exacto del PDF */}
                  
                  {/* COLUMNA DERECHA: Detalles adicionales */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    Tu solicitud entra inmediatamente en estado "Pendiente de Cotización". 
                    No hay comisiones en este paso, solo aguardas a que la aseguradora revise tu operación.
                  </div>
                  {/* Nota: Información del PDF sobre el flujo */}
                </div>



                {/* ============================================
                    FILA 2: PASO 2 - COTIZACIÓN
                    ============================================ */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  {/* ETIQUETA: "Cotización" */}
                  <div className="text-lg font-bold text-black">
                    Paso 2: Cotización
                  </div>
                  
                  {/* COLUMNA IZQUIERDA: Descripción de qué hace Solunion */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    Una aseguradora de primer nivel analiza tu solicitud y prepara una oferta de seguro. 
                    La oferta incluye: el importe de la cuota (precio del seguro) 
                    y el porcentaje de la factura que se asegura.
                  </div>
                  {/* Nota: "normalmente hasta el 90%" viene del PDF */}
                  
                  {/* COLUMNA DERECHA: Contexto sobre la oferta */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    La oferta se calcula basándose en el perfil de riesgo del deudor. 
                    Como empresa o autónomo, no estás obligado a asegurar toda tu cartera: 
                    solo las operaciones que realmente te interesen.
                  </div>
                  {/* Nota: "no estás obligado" es la ventaja clave del single-risk del PDF */}
                </div>



                {/* ============================================
                    FILA 3: PASO 3 - REVISIÓN DE OFERTA
                    ============================================ */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  {/* ETIQUETA: "Revisión" */}
                  <div className="text-lg font-bold text-black">
                    Paso 3: Revisión
                  </div>
                  
                  {/* COLUMNA IZQUIERDA: Qué ver en la oferta */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    Recibes la oferta con: la aseguradora, el importe de la cuota, 
                    el porcentaje asegurado, la fecha de la oferta y el estado ("oferta pendiente").
                  </div>
                  {/* Nota: Campos exactos del PDF en las capturas */}
                  
                  {/* COLUMNA DERECHA: Cómo proceder */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    Tienes total libertad para evaluar si la oferta te interesa. 
                    No hay penalizaciones por revisar múltiples ofertas o cambiar de opinión.
                  </div>
                </div>



                {/* ============================================
                    FILA 4: PASO 4 - ACEPTAR O RECHAZAR
                    ============================================ */}
                <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-4 md:gap-12">
                  
                  {/* ETIQUETA: "Decisión" */}
                  <div className="text-lg font-bold text-black">
                    Paso 4: Decisión
                  </div>
                  
                  {/* COLUMNA IZQUIERDA: Aceptar */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    Si aceptas la oferta, comienza el proceso de contratación con una aseguradora de primer nivel. 
                    Tu factura queda asegurada y protegida contra el riesgo de impago.
                  </div>
                  {/* Nota: "comienza el proceso de contratación" del PDF */}
                  
                  {/* COLUMNA DERECHA: Rechazar */}
                  <div className="text-base text-gray-800 leading-relaxed">
                    Si rechazas, el estado de la solicitud cambia a "Rechazada". 
                    Puedes crear una nueva solicitud en cualquier momento sin limitaciones.
                  </div>
                  {/* Nota: Flexibilidad clave del modelo single-risk */}
                </div>



              </div>
              {/* Fin del grid de filas */}


            </div>
            {/* Fin del contenedor de texto */}
            
          </div>
          {/* Fin del modal */}
          
        </div>,
        // Renderiza el portal en document.body (fuera del árbol HTML normal)
        document.body
      )}
      {/* Fin del createPortal */}
      
      
      {/* ============================================
          ANIMACIONES CSS (Keyframes)
          ============================================ */}
      <style>{`
        /* FADE IN: Desvanecimiento suave del fondo oscuro */
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        
        /* SCALE UP: Zoom + movimiento hacia arriba suave al entrar */
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
        
        /* Clase que usa fadeIn: 200ms, easing suave */
        .animate-fadeIn { 
          animation: fadeIn 0.2s ease-out forwards; 
        }
        
        /* Clase que usa scaleUp: 300ms, easing profesional */
        .animate-scaleUp { 
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
        }
      `}</style>
      {/* Fin de estilos */}
    </>
  );
  {/* Fin del componente */}
}
