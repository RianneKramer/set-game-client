import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginStore } from '../../data-access/login.store';

@Component({
  selector: 'app-logout-button',
  imports: [],
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.css',
})
export class LogoutButtonComponent {
  private loginStore = inject(LoginStore);
  private router = inject(Router);

  onLogOut() {
    this.loginStore.logout();
    this.router.navigate(['/login']);
  }
}
