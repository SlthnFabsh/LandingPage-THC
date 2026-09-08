import { SignJWT, jwtVerify } from 'jose';

const PENDING_COOKIE = 'thc_cms_pending2fa';
const PENDING_MAX_AGE_SECONDS = 10 * 60;
const SECRET = new TextEncoder().encode(getSecret());

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error('SESSION_SECRET environment variable is required.');
  }
  return secret;
}

export async function createPending2fa(userId: string): Promise<string> {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${PENDING_MAX_AGE_SECONDS}s`)
    .sign(SECRET);
}

export async function resolvePending2fa(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return (payload.userId as string) || null;
  } catch {
    return null;
  }
}

export { PENDING_COOKIE };
