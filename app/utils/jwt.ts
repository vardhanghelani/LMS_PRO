import * as jose from 'jose';

const JWT_SECRET = process.env.JWT_SECRET;

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  [key: string]: unknown; // add this index signature to satisfy jose's JWTPayload type
}

export async function generateToken(payload: JWTPayload): Promise<string> {
  // console.log('Generating token with secret:', JWT_SECRET ? 'SECRET_EXISTS' : 'NO_SECRET');
  // console.log('Token payload:', payload);
  
  const secret = new TextEncoder().encode(JWT_SECRET);
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
  
  // console.log('Generated token:', token.substring(0, 20) + '...');
  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    // console.log('Verifying token with secret:', JWT_SECRET ? 'SECRET_EXISTS' : 'NO_SECRET');
    // console.log('Token to verify:', token.substring(0, 20) + '...');
    
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    
    // console.log('Token verification successful:', payload);
    return {
      userId: payload.userId as number,
      email: payload.email as string,
      role: payload.role as string
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
} 