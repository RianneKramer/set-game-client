import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtDecodeService {
  validateToken(token: string) {
    if (!token) {
      return false;
    }
    const decoded: any = jwtDecode(token);
    if (decoded.exp * 1000 > Date.now()) {
      return true;
    } else {
      localStorage.clear()
      return false;
    }
  }
}
