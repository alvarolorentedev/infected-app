import GameStatus from './GameStatus';
import { Player } from './Player';
import RoundStatus from './RoundStatus';

export type Game = {
  id: string;
  status: GameStatus;
  round: RoundStatus;
  players: Player[];
};
