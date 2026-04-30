import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { ProfileComponent} from './features/auth/pages/profile/profile.component';
import { GameListComponent } from './features/game/pages/game-list/game-list.component';
import { GameDetailComponent } from './features/game/pages/game-detail/game-detail.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'game', component: GameListComponent, canActivate: [authGuard] },
  { path: 'game/:id', component: GameDetailComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'home' },
];

