import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: import.meta.env.EMAIL_USER,
    pass: import.meta.env.EMAIL_PASSWORD,
  },
});

export const POST: APIRoute = async ({ request }) => {
  try {
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ message: 'Método no permitido' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const bodyText = await request.text();
    if (!bodyText) {
      return new Response(
        JSON.stringify({ message: 'Body vacío' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = JSON.parse(bodyText);
    const { name, email, phone, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ message: 'Faltan datos requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const recipientEmail = import.meta.env.RECIPIENT_EMAIL;

    // Enviar email
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

    // Email de confirmación
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

    return new Response(
      JSON.stringify({ message: 'Email enviado correctamente' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error enviando email:', error);
    return new Response(
      JSON.stringify({
        message: 'Error al enviar el email',
        error: error instanceof Error ? error.message : 'Error desconocido',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
