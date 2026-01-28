import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

// ✅ CRÍTICO: Dile a Astro que esto es server-rendered
export const prerender = false;

// Configura transportador de emails con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: import.meta.env.EMAIL_USER,
    pass: import.meta.env.EMAIL_PASSWORD,
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    // Valida que sea POST
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ message: 'Método no permitido' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ✅ Lee el body como texto PRIMERO
    let bodyText: string;
    try {
      bodyText = await request.text();
    } catch (error) {
      console.error('❌ Error leyendo texto:', error);
      return new Response(
        JSON.stringify({ message: 'Error leyendo datos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verifica que no esté vacío
    if (!bodyText || bodyText.trim() === '') {
      console.warn('⚠️ Body vacío');
      return new Response(
        JSON.stringify({ message: 'Body vacío' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ✅ Parsea JSON manualmente
    let data;
    try {
      console.log('📦 Body recibido:', bodyText);
      data = JSON.parse(bodyText);
    } catch (error) {
      console.error('❌ Error parseando JSON:', error);
      console.error('Body problemático:', bodyText);
      return new Response(
        JSON.stringify({ message: 'JSON inválido' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { name, email, phone, subject, message } = data;

    console.log('📧 EMAIL_USER:', import.meta.env.EMAIL_USER);
    console.log('📧 RECIPIENT_EMAIL:', import.meta.env.RECIPIENT_EMAIL);
    console.log('📧 Datos recibidos:', { name, email, subject });
    console.log('🔄 Intentando enviar email...');

    // Valida campos requeridos
    if (!name || !email || !subject || !message) {
      console.warn('⚠️ Faltan campos requeridos');
      return new Response(
        JSON.stringify({ message: 'Faltan datos requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtiene email destinatario
    const recipientEmail = import.meta.env.RECIPIENT_EMAIL;

    // Envía email al destinatario
    console.log('📤 Enviando email #1 (al destinatario)...');
    await transporter.sendMail({
      from: import.meta.env.EMAIL_USER,
      to: recipientEmail,
      subject: `Nuevo mensaje de ${name}: ${subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log('✅ Email #1 enviado correctamente');

    // Envía email de confirmación al usuario
    console.log('📤 Enviando email #2 (confirmación al usuario)...');
    await transporter.sendMail({
      from: import.meta.env.EMAIL_USER,
      to: email,
      subject: 'Hemos recibido tu mensaje',
      html: `
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola ${name},</p>
        <p>Hemos recibido tu mensaje y te responderemos pronto.</p>
        <p>Saludos,<br> aseofi®</p>
      `,
    });

    console.log('✅ Email #2 (confirmación) enviado correctamente');

    // Retorna respuesta exitosa
    return new Response(
      JSON.stringify({ message: 'Email enviado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    // Maneja errores
    console.error('❌ Error enviando email:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Error desconocido');
    console.error('Error stack:', error instanceof Error ? error.stack : 'Sin stack trace');
    
    return new Response(
      JSON.stringify({
        message: 'Error al enviar el email',
        error: error instanceof Error ? error.message : 'Error desconocido',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
