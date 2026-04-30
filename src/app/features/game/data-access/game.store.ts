import { computed, Injectable, signal } from '@angular/core';
import { GameService } from './game.service';
import { Router } from '@angular/router';
import { Game, GameDetail } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameStore {
  // STATE
  private _game = signal<GameDetail | null>(null);
  private _gameList = signal<Game[] | null>(null)
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private _hintedCards = signal<number[]>([]);
  private _selectedCards = signal<number[]>([]);
  private _availableSetCount = signal<number>(0)

  // PUBLIC READ-ONLY STATE
  game = this._game.asReadonly();
  gameList = this._gameList.asReadonly();
  loading = this._loading.asReadonly();
  error = this._error.asReadonly();
  hintedCards = this._hintedCards.asReadonly();
  selectedCards = this._selectedCards.asReadonly();
  availableSetCount = this._availableSetCount.asReadonly();

  // DERIVED STATE (computed)
  isFinished = computed(() => this._game()?.isFinished ?? false);
  cards = computed(() => this._game()?.cards ?? []);
  tableCards = computed(() =>
    this._game()?.cards.filter(card => card.location === 'Table') ?? []
  );
  deckCards = computed(() =>
    this._game()?.cards.filter(card => card.location === 'Deck').length ?? 0
  );
  setsFound = computed(() =>
    this._game()?.foundSets.length ?? 0
  );

  constructor(private gameService: GameService, private router: Router) {}

  // ACTIONS
  loadGame(gameId: number) {
    this.resetGame(gameId);
    this._error.set(null);

    this.gameService.getGame(gameId).subscribe({
      next: (game) => {
        this._game.set(game);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to load game');
        this._loading.set(false);
      },
    })
  }

  getGameList() {
    this._loading.set(true);
    this._error.set(null);

    this.gameService.getGames().subscribe({
      next: (games) => {
        this._gameList.set(games);
        this._loading.set(false);
      },
      error: () => {
        this._error.set('Failed to get games');
        this._loading.set(false);
      }
    })
  }

  createGame() {
    this._loading.set(true);
    this._error.set(null);

    this.gameService.createGame().subscribe({
      next: (gameId) => {
        this.router.navigate(['/game', gameId]);
        this.loadGame(gameId);
      },
      error: () => {
        this._error.set('Failed to create game');
        this._loading.set(false);
      }
    })
  }

  drawCard(gameId: number) {
    this.gameService.drawCard(gameId).subscribe({
      next: () => {
        this.getAvailableSets(gameId);
        this.loadGame(gameId);
      },
      error: () => {
        this._error.set('Failed to draw card');
        this._loading.set(false);
      },
    });
  }

  getHint(gameId: number) {
    this.gameService.getHint(gameId).subscribe({
      next: (hints) => {
        if (!hints) return;

        const ids = hints.cards.map((c) => c.cardId);
        this._hintedCards.update((current) => [...current, ...ids]);
      },
      error: () => {
        this._error.set('Failed to get hints');
        this._loading.set(false);
      },
    });
  }

  toggleCard(cardId: number) {
    this._selectedCards.update((current) =>
      current.includes(cardId)
        ? current.filter((id) => id !== cardId)
        : [...current, cardId]
    );
  }

  confirmSet(gameId: number) {
    this._loading.set(true);
    const selected = this._selectedCards();

    this.gameService.confirmSet(gameId, selected).subscribe({
      next: () => {
        this._selectedCards.set([])
        this.getAvailableSets(gameId)
        this.loadGame(gameId);
      },
      error: () => {
        this._error.set('Failed to confirm set');
        this._loading.set(false);
      },
    });
  }

  endgame(gameId: number) {
    this._loading.set(true);

    this.gameService.endGame(gameId).subscribe({
      next: () => this.loadGame(gameId),
      error: () => {
        this._error.set('Failed to end game');
        this._loading.set(false);
      },
    });
  }

  deleteGame(gameId: number) {
    this._loading.set(true);

    this.gameService.deleteGame(gameId).subscribe({
      next: () => this.loadGame(gameId),
      error: () => {
        this._error.set('Failed to delete game');
        this._loading.set(false);
      }
    })
  }

  getAvailableSets(gameId: number) {
    this._loading.set(true);

    this.gameService.availableSets(gameId).subscribe({
      next: (count) => {
        this._availableSetCount.set(count);
        this.loadGame(gameId);
      },
      error: () => {
        this._error.set('Failed to get available sets');
        this._loading.set(false);
      },
    });
  }

  resetGame(gameId: number) {
    if (this._game()?.id === gameId) {
      return;
    } else {
      this._game.set(null);
      this._loading.set(true);
    }
  }

  isSelected = (cardId: number) =>
    this._selectedCards().includes(cardId);

  isHinted = (cardId: number) =>
    this._hintedCards().includes(cardId);
}
