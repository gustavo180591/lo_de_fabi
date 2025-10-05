// JWT configuration
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'your-secret-key-please-change-in-production',
  expiresIn: '7d',
  issuer: 'lo-de-fabi',
  audience: 'lo-de-fabi-users',
};

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
