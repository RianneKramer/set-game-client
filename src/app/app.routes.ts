import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent} from './pages/profile/profile.component';
import { GameListComponent } from './pages/game-list/game-list.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'game', component: GameListComponent },
  { path: 'game/:id', component: GameComponent },
  { path: '**', redirectTo: 'home' },
];
