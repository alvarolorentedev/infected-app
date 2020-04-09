import { GameStatus } from './GameStatus';
import { Player } from './Player';

export type Game = {
  id: string;
  status: GameStatus;
  players: Player[];
};
