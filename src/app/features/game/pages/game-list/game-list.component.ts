import { Component, effect, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoginStore } from '../../../auth/data-access/login.store';
import { GameStore } from '../../data-access/game.store';

@Component({
  selector: 'app-game-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
})
export class GameListComponent implements OnInit {
  private gameStore = inject(GameStore);
  private loginStore = inject(LoginStore);
  private router = inject(Router);

  games = this.gameStore.gameList

  loading = this.gameStore.loading();

  constructor() {
    effect(() => {
      if (!this.loginStore.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gameStore.getGameList();
  }

  createGame() {
    this.gameStore.createGame();
  }
}
