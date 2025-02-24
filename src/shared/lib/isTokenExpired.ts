import { jwtDecode } from 'jwt-decode';

export const isTokenExpired = (token: string) => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const currentTime = Math.floor(Date.now() / 1000);

      console.log(`token time left: [${exp - currentTime}]`);

      return exp < currentTime;
    } catch {
      return true; // Treat invalid token as expired
    }
  };
  