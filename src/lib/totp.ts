import { generateSecret, verifySync, generateURI } from 'otplib';

// Secret disimpan sebagai base32 (hasil generateSecret) dan di-encrypt di DB.
export function generateTotpSecret(): string {
  return generateSecret();
}

export function totpSecretUri(accountName: string, secretBase32: string): string {
  return generateURI({
    issuer: 'THC CMS',
    label: accountName,
    algorithm: 'sha1',
    digits: 6,
    period: 30,
    secret: secretBase32,
  });
}

export function verifyTotpToken(token: string, secretBase32: string): boolean {
  if (!/^\d{6}$/.test(token)) return false;
  try {
    const result = verifySync({ token, secret: secretBase32, epochTolerance: [1, 1] });
    return !!result && result.valid === true;
  } catch {
    return false;
  }
}
