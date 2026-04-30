export interface Game {
  id: number;
  startedAt: Date;
  isFinished: Boolean;
}

export interface Hint {
  cards: GameCard[];
}

export interface GameDetail {
  id: number;
  cards: GameCard[];
  foundSets: FoundSets[];
  isFinished: Boolean;
}

export interface GameCard {
  cardId: number;
  location: string;
}

export interface FoundSets {
  setId: number;
  cardId1: number;
  cardId2: number;
  cardId3: number;
}
