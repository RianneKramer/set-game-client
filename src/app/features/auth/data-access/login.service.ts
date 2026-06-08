import { Injectable } from '@angular/core';
import { HttpConfigService } from '../../../core/services/http-config.service';
import { Login, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly baseUrl = 'auth';
  private readonly endpoints = {
    login: 'login',
  };

  constructor(private configService: HttpConfigService) {}

  private loginUrl(suffix: string = ''): string {
    return `${this.baseUrl}/${suffix}`;
  }

  postLogin(login: Login) {
    return this.configService.post<LoginResponse>(this.loginUrl() + this.endpoints.login, login);
  }
}
