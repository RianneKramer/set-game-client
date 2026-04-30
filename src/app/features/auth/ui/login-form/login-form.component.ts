import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { LoginStore } from '../../data-access/login.store';
import { Login } from '../../data-access/login.model';

@Component({
  selector: 'app-login-form',
  imports: [FormField],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LoginFormComponent {
  private loginStore = inject(LoginStore);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.loginStore.isLoggedIn()) {
        console.log(this.loginStore.isLoggedIn())
        this.router.navigate(['/game']);
      }
    });
  }

  loginModel = signal<Login>({
    username: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.username, { message: 'Username is required' });
    required(fieldPath.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();

    submit(this.loginForm, async () => {
      this.loginStore.login(this.loginModel());
    })
  }
}
