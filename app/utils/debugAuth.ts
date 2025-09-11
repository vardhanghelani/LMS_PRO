import { verifyToken } from '@/app/utils/jwt';

export function debugAuth(token: string) {
  // console.log('=== AUTH DEBUG ===');
  // console.log('Token exists:', !!token);
  // console.log('Token length:', token?.length);
  // console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
  
  if (token) {
    try {
      const payload = verifyToken(token);
      // console.log('Token verification result:', payload);
      return payload;
    } catch (error) {
      console.log('Token verification error:', error);
      return null;
    }
  }
  
  return null;
}