// Environment variables should be set in .env file
// Example:
// EMAIL_SERVICE=sendgrid
// EMAIL_FROM=noreply@lodefabi.com
// SENDGRID_API_KEY=your_sendgrid_api_key

import { env } from '$env/dynamic/private';

export const EMAIL_CONFIG = {
  service: env.EMAIL_SERVICE || 'console', // 'console' for development
  from: env.EMAIL_FROM || 'noreply@lodefabi.com',
  // Add other email providers as needed
  sendgrid: {
    apiKey: env.SENDGRID_API_KEY || '',
  },
};

export const VERIFICATION_EMAIL_TEMPLATE = (verificationUrl: string, name: string) => ({
  subject: 'Verifica tu cuenta en Lo de Fabi',
  text: `Hola ${name},\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace:\n${verificationUrl}\n\nSi no solicitaste esto, puedes ignorar este correo.\n\nSaludos,\nEl equipo de Lo de Fabi`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Hola ${name},</h2>
      <p>Gracias por registrarte en Lo de Fabi. Por favor verifica tu cuenta haciendo clic en el siguiente botón:</p>
      <div style="text-align: center; margin: 25px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #4f46e5; color: white; padding: 12px 24px; 
                  text-decoration: none; border-radius: 4px; font-weight: bold;">
          Verificar mi cuenta
        </a>
      </div>
      <p>O copia y pega esta URL en tu navegador:</p>
      <p style="word-break: break-all;">${verificationUrl}</p>
      <p>Si no solicitaste esto, puedes ignorar este correo.</p>
      <p>Saludos,<br>El equipo de Lo de Fabi</p>
    </div>
  `,
});
