import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from './config';

export type TokenPayload = {
  userId: string;
  role: string;
  email: string;
  purpose?: string; // Optional field for specific token purposes (e.g., 'email-verification')
};

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(
    payload,
    JWT_CONFIG.secret,
    {
      expiresIn: JWT_CONFIG.expiresIn,
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
    } as jwt.SignOptions
  );
}

export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_CONFIG.secret, {
      issuer: JWT_CONFIG.issuer,
      audience: JWT_CONFIG.audience,
    }) as TokenPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired');
    }
    throw new Error('Invalid token');
  }
}
