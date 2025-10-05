import bcrypt from 'bcryptjs';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from './config';

export class PasswordError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordError';
  }
}

export async function hashPassword(password: string): Promise<string> {
  if (password.length < PASSWORD_MIN_LENGTH) {
    throw new PasswordError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
  }
  
  if (!PASSWORD_REGEX.test(password)) {
    throw new PasswordError(
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    );
  }
  
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
