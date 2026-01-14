// IMPORTACIONES DE REACT
import React, { useState } from 'react';



// ============================================
// DATOS DE PREGUNTAS FRECUENTES (Basadas en PDF)
// ============================================
// Array con 6 preguntas sobre ASEOFI
// Cada objeto contiene: question (pregunta) y answer (respuesta)
const faqData = [
  {
    // Pregunta 1: Acceso a ASEOFI
    question: "¿Quién puede usar aseofi?",
    // Del PDF: "no se discriminaría si el tomador del seguro es una gran corporación, una pyme o un autónomo"
    answer: "Cualquier empresa, pyme o autónomo puede usar aseofi. No hay requisitos de facturación mínima ni obligación de asegurar toda tu cartera de clientes. Solo asegura las facturas a crédito que necesites proteger."
  },
  {
    // Pregunta 2: Ventajas del modelo single-risk
    question: "¿Por qué aseofi es diferente a otros seguros de crédito?",
    // Del PDF: "los seguros 'global-risk' implica tener que asegurar toda la cartera" y "single-risk permiten asegurar operaciones individuales"
    answer: "La mayoría de seguros de crédito (global-risk) te obligan a asegurar toda tu cartera de clientes y tienen facturación mínima muy alta. aseofi ofrece seguros single-risk: aseguras solo las facturas individuales que quieras, sin compromisos. Ideal para pymes y autónomos."
  },
  {
    // Pregunta 3: Proceso de solicitud
    question: "¿Cuál es el proceso para asegurar una factura?",
    // Del PDF: proceso de 4 pasos (solicitud → cotización → oferta → aceptación)
    answer: "Es muy simple: 1) Registras una solicitud con los datos del deudor y de la factura. 2) Tu solicitud entra en 'Pendiente de Cotización'. 3) Una aseguradora de primer nivel prepara una oferta con el precio del seguro y el porcentaje asegurado. 4) Aceptas o rechazas la oferta. Si la aceptas, comienza la contratación."
  },
  {
    // Pregunta 4: Cobertura del seguro
    question: "¿Hasta qué porcentaje se asegura una factura?",
    // Del PDF: "normalmente no se suele ofrecer el 100% del importe de la factura"
    answer: "El porcentaje variará dependiendo del caso de la factura."
  },
  {
    // Pregunta 5: ¿Quién respalda aseofi?
    question: "¿Quién está detrás de aseofi?",
    // Del PDF: "esta aplicación forma parte o está respaldada por DIEGOCOR, correduría de seguros, S.L. con CDGS: J-3021"
    answer: "aseofi forma parte de DIEGOCOR, Correduría de Seguros, S.L. (CDGS: J-3021, ubicada en Murcia, España). Somos una correduría especializada en seguros de crédito que trabaja con una aseguradora de primer nivel, una de las compañías más importantes del mundo en esta modalidad."
  },
  {
    // Pregunta 6: ¿Cómo protege Solunion el impago?
    question: "¿Qué pasa si mi deudor no paga después de asegurar?",
    // Del PDF: "es posible que el cliente provoque un impago... una compañía de seguros, se haga cargo de compensar dicha operación"
    answer: "Ese es exactamente el propósito del seguro de crédito. Si tu deudor no realiza el pago en el plazo acordado, una aseguradora experta se encarga de compensar la operación. El seguro protege tu flujo de caja contra el riesgo de impago y te permite seguir creciendo sin preocupaciones."
  }
];



// ============================================
// COMPONENTE REACT: PREGUNTAS FRECUENTES (FAQ)
// ============================================
export default function FaqComponent() {
  
  // ============================================
  // ESTADO: Controla qué pregunta está abierta
  // ============================================
  // openIndex = índice de la pregunta abierta (0-5) o null si ninguna está abierta
  // setOpenIndex = función para cambiar qué pregunta se abre/cierra
  const [openIndex, setOpenIndex] = useState(null);


  // ============================================
  // FUNCIÓN: Toggle para abrir/cerrar preguntas
  // ============================================
  // Si la pregunta actual ya está abierta, la cierra
  // Si está cerrada, la abre (y cierra cualquier otra que estuviera abierta)
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };



  return (
    <div className="w-full">
      
      {/* ============================================
          MAPEO DE PREGUNTAS: Renderiza cada pregunta del array
          ============================================ */}
      {faqData.map((item, index) => {
        
        // Verifica si esta pregunta está actualmente abierta
        const isOpen = openIndex === index;


        return (
          // CONTENEDOR DE CADA PREGUNTA-RESPUESTA
          <div key={index} className="border-b border-gray-200">
            
            {/* ============================================
                BOTÓN / PREGUNTA (Clickeable)
                ============================================ */}
            <button
              onClick={() => toggleFaq(index)}
              // Estilos: flex, espacio entre, texto a la izquierda, sin outline en focus
              className="w-full py-6 flex justify-between items-center text-left group focus:outline-none cursor-pointer"
            >
              
              {/* TEXTO DE LA PREGUNTA */}
              {/* 
                - text-xl = 20px (coherente con features y párrafos)
                - font-bold = Peso 700
                - text-gray-900 = Negro oscuro (#111827)
                - group-hover:text-[#14549C] = Azul al pasar el ratón
                - transition-colors = Cambio de color suave (200ms)
                - pr-8 = Padding derecho para evitar solapamiento con icono
              */}
              <span className="text-xl font-bold text-gray-900 group-hover:text-[#14549C] transition-colors pr-8">
                {item.question}
              </span>


              {/* ICONO ROTATIVO (+) */}
              {/*
                - shrink-0 = No se comprime
                - ml-4 = Margen izquierdo para separación
              */}
              <span className="shrink-0 ml-4">
                {/* 
                  SVG: Icono de "+" que rota 45° cuando se abre (parecido a "×")
                  - w-6 h-6 = Tamaño 24x24px
                  - transform transition-transform = Animación de rotación
                  - duration-500 = 500ms (rotación lenta y suave)
                  - ease-in-out = Aceleración natural
                  - rotate-45 si isOpen, rotate-0 si cerrado
                */}
                <svg 
                  className={`w-6 h-6 text-gray-900 transform transition-transform duration-500 ease-in-out ${isOpen ? 'rotate-45' : 'rotate-0'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  {/* 
                    strokeLinecap="round" = Extremos redondeados en las líneas
                    strokeWidth="2.5" = Grosor de la línea
                    d="M12 4v16m8-8H4" = Dibuja una cruz (+)
                  */}
                </svg>
              </span>
            </button>


            {/* ============================================
                CONTENEDOR ANIMADO DE RESPUESTA
                ============================================ */}
            {/*
              - faq-transition = Clase personalizada (ver CSS al final)
              - faq-open / faq-closed = Estados que controlan la animación
              - Cambia automáticamente cuando isOpen cambia
            */}
            <div 
              className={`faq-transition ${isOpen ? 'faq-open' : 'faq-closed'}`}
            >
              
              {/* CONTENEDOR INTERNO (El que se desliza) */}
              {/*
                - faq-inner = Clase personalizada con mediciones automáticas
              */}
              <div className="faq-inner">
                
                {/* TEXTO DE RESPUESTA */}
                {/*
                  - text-gray-600 = Gris medio (#4b5563)
                  - text-xl = 20px (coherente con features y párrafos)
                  - leading-relaxed = Altura de línea generosa (1.625) para legibilidad
                  - max-w-3xl = Ancho máximo para evitar líneas demasiado largas
                  - pb-8 = Padding inferior (espaciado abajo)
                  - pt-2 = Padding superior pequeño (separación de la pregunta)
                */}
                <p className="text-gray-600 text-xl leading-relaxed max-w-3xl pb-8 pt-2">
                  {item.answer}
                </p>
              </div>
            </div>


          </div>
        );
      })}



      {/* ============================================
          ENLACE DE AYUDA AL FINAL
          ============================================ */}
      {/* 
        - mt-12 = Margen superior 48px (separación)
        - pl-1 = Pequeño padding izquierdo (alineación)
      */}
      <div className="mt-12 pl-1">
        
        {/* LINK A PÁGINA DE AYUDA */}
        <a 
          href="#contact" 
          // Estilos: inline-flex, items-center, negrita, hover azul
          className="inline-flex items-center text-xl font-bold text-gray-900 hover:text-[#14549C] transition-colors"
        >
          {/* TEXTO */}
          Ayuda
          
          {/* ICONO FLECHA DERECHA */}
          {/*
            - w-5 h-5 = Tamaño 20x20px
            - ml-2 = Margen izquierdo 8px (separación del texto)
          */}
          <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>


      {/* ============================================
          CSS PERSONALIZADO PARA ANIMACIONES FAQ
          ============================================ */}
      <style>{`
        /* Contenedor que se anima cuando se abre/cierra */
        .faq-transition {
          overflow: hidden;
          transition: max-height 0.5s ease-in-out;
        }

        /* Estado abierto: muestra la respuesta */
        .faq-open {
          max-height: 1000px;
        }

        /* Estado cerrado: oculta la respuesta */
        .faq-closed {
          max-height: 0;
        }

        /* Contenedor interno que mide automáticamente */
        .faq-inner {
          overflow: hidden;
        }
      `}</style>

    </div>
  );
}
