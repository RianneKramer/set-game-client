import { computed, Injectable, signal } from '@angular/core';
import { LoginService } from './login.service';
import { JwtDecodeService } from '../../../core/services/jwt-decode.service';
import { Login } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginStore {
  private _token = signal<string | null>(null);
  private _loading = signal<boolean | null>(null);
  private _error = signal<string | null>(null);

  private logoutTimer: any;

  // token = this._token.asReadonly();
  // loading = this._loading.asReadonly();
  // error = this._error.asReadonly();

  isLoggedIn = computed(() => !!this._token());

  constructor(private loginService: LoginService, private jwt: JwtDecodeService) {}

  init() {
    const token = localStorage.getItem('authToken');

    if (!token || this.jwt.isExpired(token)) {
      this.logout();
      return;
    }

    this.setToken(token);
  }

  setToken(token: string) {
    this._token.set(token);
    localStorage.setItem('authToken', token);

    this.startAutoLogout(token);
  }
  clearToken() {
    this._token.set(null);
    localStorage.clear();
  }

  login(credentials: Login) {
    this._loading.set(true);
    this._error.set(null);

    this.loginService.postLogin(credentials).subscribe({
      next: (response) => {
        this.setToken(response.token);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Invalid username or password');
        this._loading.set(false);
      }
    })
  }

  logout() {
    this.clearToken();
  }

  private startAutoLogout(token: string) {
    const exp = this.jwt.getExpiration(token);
    if (!exp) return;

    const timeout = exp - Date.now();

    if (timeout <= 0) {
      this.logout();
      return;
    }

    clearTimeout(this.logoutTimer);

    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, timeout);
  }
}
