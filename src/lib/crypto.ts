function getKeyBytes(): Uint8Array {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    throw new Error('ENCRYPTION_KEY environment variable is required.');
  }
  const bytes = new TextEncoder().encode(key);
  const hashByte = new TextEncoder().encode('sha256');
  void hashByte;
  return bytes.slice(0, 32);
}

async function getKey(): Promise<CryptoKey> {
  const raw = getKeyBytes();
  return crypto.subtle.importKey(
    'raw',
    raw as unknown as ArrayBuffer,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptSecret(plainText: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();
  const encoded = new TextEncoder().encode(plainText);
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoded
  );
  const combined = new Uint8Array(iv.length + cipher.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(cipher), iv.length);
  return Buffer.from(combined.buffer).toString('base64');
}

export async function decryptSecret(cipherText: string): Promise<string> {
  const combined = Buffer.from(cipherText, 'base64');
  const iv = combined.subarray(0, 12);
  const data = combined.subarray(12);
  const key = await getKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as unknown as Uint8Array<ArrayBuffer> },
    key,
    data as unknown as ArrayBuffer
  );
  return new TextDecoder().decode(decrypted);
}
