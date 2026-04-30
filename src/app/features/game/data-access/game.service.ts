import { Injectable } from '@angular/core';
import { HttpConfigService } from '../../../core/services/http-config.service';
import { Game, GameCard, GameDetail, Hint } from './game.model';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private readonly baseUrl = 'Games';
  private readonly endpoints = {
    end: 'end',
    hint: 'hint',
    selectCards: 'select-cards',
    availableSets: 'available-sets',
  }

  constructor(private configService: HttpConfigService) {}

  private gameUrl(gameId: number, suffix: string = ''): string {
    return `${this.baseUrl}/${gameId}/${suffix}`;
  }

  getGames() {
    return this.configService.get<Game[]>(this.baseUrl);
  }

  createGame() {
    return this.configService.post<number>(this.baseUrl, {});
  }

  getGame(gameId: number) {
    return this.configService.get<GameDetail>(this.gameUrl(gameId));
  }

  endGame(gameId: number) {
    return this.configService.patch<number>(this.gameUrl(gameId, this.endpoints.end), {});
  }

  getHint(gameId: number) {
    return this.configService.get<Hint>(this.gameUrl(gameId, this.endpoints.hint));
  }

  deleteGame(gameId: number) {
    return this.configService.delete(this.gameUrl(gameId));
  }

  drawCard(gameId: number) {
    return this.configService.patch<GameCard>(this.gameUrl(gameId), {});
  }

  confirmSet(gameId: number, cardIds: number[]) {
    return this.configService.post<Boolean>(this.gameUrl(gameId, this.endpoints.selectCards), cardIds);
  }

  availableSets(gameId: number) {
    return this.configService.get<number>(this.gameUrl(gameId, this.endpoints.availableSets))
  }
}
