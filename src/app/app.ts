import { Component, inject, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { LoginStore } from './features/auth/data-access/login.store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('set-game-client');
  private loginStore = inject(LoginStore);

  constructor() {
    this.loginStore.init();
  }
}
