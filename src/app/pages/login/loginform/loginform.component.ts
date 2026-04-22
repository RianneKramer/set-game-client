import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { HttpConfigService } from '../../../services/http-config.service';

interface LoginFormComponent {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-loginform',
  imports: [FormField],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Logindata {
  loginModel = signal<LoginFormComponent>({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.username, {message: 'Username is required'});
    required(fieldPath.password, {message: 'Password is required'});
  });

  constructor(private configService: HttpConfigService, private route: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const credentials = this.loginModel();
      try {
        this.configService.post<LoginResponse>('auth/login', credentials).subscribe((LoginResponse) => {
          if (LoginResponse.token) {
            localStorage.setItem('authToken', LoginResponse.token);
            this.route.navigate(['/profile']);
          }
        });
      } catch (e) {
        console.error('Login failed:', e);
      }
    })
  }
}
