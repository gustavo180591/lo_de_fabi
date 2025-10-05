import nodemailer from 'nodemailer';
import { EMAIL_CONFIG, VERIFICATION_EMAIL_TEMPLATE } from './config';
import { generateToken } from '../auth/jwt';
import { env } from '$env/dynamic/private';

const createTransporter = () => {
  if (EMAIL_CONFIG.service === 'console') {
    // Create a test account for development
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'test@example.com',
        pass: 'testpass',
      },
      logger: true,
      debug: true,
    });
  }

  if (EMAIL_CONFIG.service === 'sendgrid') {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: EMAIL_CONFIG.sendgrid.apiKey,
      },
    });
  }

  throw new Error(`Unsupported email service: ${EMAIL_CONFIG.service}`);
};

export async function sendVerificationEmail(email: string, name: string, userId: string) {
  // Include default 'USER' role for email verification
  const token = generateToken({ 
    userId, 
    email, 
    role: 'PLAYER', // Default role for new users
    purpose: 'email-verification' 
  });
  const verificationUrl = `${env.BASE_URL || 'http://localhost:5173'}/auth/verify-email?token=${token}`;
  
  const emailContent = VERIFICATION_EMAIL_TEMPLATE(verificationUrl, name);
  
  const transporter = createTransporter();
  
  try {
    const info = await transporter.sendMail({
      from: `"Lo de Fabi" <${EMAIL_CONFIG.from}>`,
      to: email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    });

    if (EMAIL_CONFIG.service === 'console') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}

export async function sendPasswordResetEmail(email: string, name: string, token: string) {
  const resetUrl = `${env.BASE_URL || 'http://localhost:5173'}/auth/reset-password?token=${token}`;
  
  const transporter = createTransporter();
  
  try {
    const info = await transporter.sendMail({
      from: `"Lo de Fabi" <${EMAIL_CONFIG.from}>`,
      to: email,
      subject: 'Restablece tu contraseña',
      text: `Hola ${name},\n\nPara restablecer tu contraseña, haz clic en el siguiente enlace:\n${resetUrl}\n\nSi no solicitaste esto, puedes ignorar este correo.\n\nSaludos,\nEl equipo de Lo de Fabi`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hola ${name},</h2>
          <p>Haz clic en el botón a continuación para restablecer tu contraseña:</p>
          <div style="text-align: center; margin: 25px 0;">
            <a href="${resetUrl}" 
               style="background-color: #4f46e5; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 4px; font-weight: bold;">
              Restablecer contraseña
            </a>
          </div>
          <p>O copia y pega esta URL en tu navegador:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          <p>Si no solicitaste esto, puedes ignorar este correo.</p>
          <p>Saludos,<br>El equipo de Lo de Fabi</p>
        </div>
      `,
    });

    if (EMAIL_CONFIG.service === 'console') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error('Failed to send password reset email');
  }
}
