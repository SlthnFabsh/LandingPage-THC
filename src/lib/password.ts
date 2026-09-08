import { hash, verify } from '@node-rs/argon2';

export const PASSWORD_MAX_AGE_DAYS = 90;
export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_RULES = {
  minLength: PASSWORD_MIN_LENGTH,
  requireUpper: true,
  requireLower: true,
  requireNumber: true,
  requireSymbol: true,
};

export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
    algorithm: 2,
  });
}

export async function verifyPassword(hashValue: string, password: string): Promise<boolean> {
  try {
    return await verify(hashValue, password);
  } catch {
    return false;
  }
}

export function isPasswordExpired(passwordChangedAt: Date): boolean {
  const maxAgeMs = PASSWORD_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - passwordChangedAt.getTime() > maxAgeMs;
}

export function validatePasswordPolicy(password: string): { valid: boolean; message?: string } {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return { valid: false, message: `Kata sandi minimal ${PASSWORD_MIN_LENGTH} karakter.` };
  }
  if (PASSWORD_RULES.requireUpper && !/[A-Z]/.test(password)) {
    return { valid: false, message: 'Kata sandi harus mengandung huruf besar (A-Z).' };
  }
  if (PASSWORD_RULES.requireLower && !/[a-z]/.test(password)) {
    return { valid: false, message: 'Kata sandi harus mengandung huruf kecil (a-z).' };
  }
  if (PASSWORD_RULES.requireNumber && !/[0-9]/.test(password)) {
    return { valid: false, message: 'Kata sandi harus mengandung angka (0-9).' };
  }
  if (PASSWORD_RULES.requireSymbol && !/[^A-Za-z0-9]/.test(password)) {
    return { valid: false, message: 'Kata sandi harus mengandung simbol (!@#$%...).' };
  }
  return { valid: true };
}
