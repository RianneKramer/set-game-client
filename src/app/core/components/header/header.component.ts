import { Component, inject } from '@angular/core';
import { LoginStore } from '../../../features/auth/data-access/login.store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private loginStore = inject(LoginStore);

  isLoggedIn = this.loginStore.isLoggedIn;
}
