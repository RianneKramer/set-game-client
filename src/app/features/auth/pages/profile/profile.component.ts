import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutButtonComponent } from '../../ui/logout-button/logout-button.component';
import { LoginStore } from '../../data-access/login.store';

@Component({
  selector: 'app-profile',
  imports: [LogoutButtonComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private loginStore = inject(LoginStore);
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.loginStore.isLoggedIn) {
        this.router.navigate(['/login']);
      }
    });
  }
}
