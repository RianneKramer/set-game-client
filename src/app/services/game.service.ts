import { Injectable } from '@angular/core';
import { HttpConfigService } from './http-config.service';

export interface Game {
  id: number;
  startedAt: Date;
  isFinished: boolean;
}

export interface GameDetail {
  id: number;
  cards: GameCard[];
  isFinished: boolean;
}

export interface GameCard {
  cardId: number;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private configService: HttpConfigService) {}

  getGames(){
    return this.configService.get<Game[]>('Games');
  }

  createGame() {
    return this.configService.post<number>('Games', {})
  }

  getGame(gameId: number){
    return this.configService.get<GameDetail>(`Games/${gameId}`);
  }

  endGame(gameId: number) {
    return this.configService.post<number>(`Games/${gameId}/end`, {})
  }

  getHint(gameId: number) {
    return this.configService.post<number>(`Games/${gameId}/hint`, {});
  }

  deleteGame(gameId: number) {
    return this.configService.delete(`Games/${gameId}`);
  }

  drawCard(gameId: number) {
    return this.configService.patch<GameCard>(`Games/${gameId}`, {});
  }
}
