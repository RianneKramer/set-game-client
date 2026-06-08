import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameStore } from '../../data-access/game.store';
import { LoginStore } from '../../../auth/data-access/login.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-game',
  imports: [CardComponent],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css',
})
export class GameDetailComponent implements OnInit {
  private gameStore = inject(GameStore);
  private loginStore = inject(LoginStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  game = this.gameStore.game;
  tableCards = this.gameStore.tableCards;
  deckCards = this.gameStore.deckCards;
  loading = this.gameStore.loading;
  isSelected = this.gameStore.isSelected;
  isHinted = this.gameStore.isHinted;
  availableSetCount = this.gameStore.availableSetCount;
  setsFound = this.gameStore.setsFound;
  isFinished = this.gameStore.isFinished;

  gameId!: number;

  constructor() {
    effect(() => {
      if (!this.loginStore.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnInit() {
    this.gameId = Number(this.route.snapshot.paramMap.get('id'));
    this.gameStore.loadGame(this.gameId);
    this.gameStore.getAvailableSets(this.gameId);
  }

  onEndGame() {
    this.gameStore.endgame(this.gameId);
  }

  onGetHint() {
    this.gameStore.getHint(this.gameId);
  }

  onDeleteGame() {
    this.gameStore.deleteGame(this.gameId);
  }

  onDrawCard() {
    this.gameStore.drawCard(this.gameId);
  }

  onToggleCard(cardId: number) {
    this.gameStore.toggleCard(cardId);
  }

  onConfirmSet() {
    this.gameStore.confirmSet(this.gameId);
  }

  onPlayAgain() {
    this.gameStore.createGame();
  }
}
