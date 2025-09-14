import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
   exp: number;
}

export const setToken = (token: string) => {
  Cookies.set('token', token, { expires: 7 });
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
};

export const getUserFromToken = (): JwtPayload | null => {
  const token = getToken();
  if (!token) return null;
  
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const isAdmin = (): boolean => {
  const user = getUserFromToken();
  return user?.role === 'Admin';
};