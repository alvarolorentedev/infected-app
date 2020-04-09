import Card from './Card';
import { PlayerStatus } from './PlayerStatus';

export type Player = {
  name: string;
  card: Card;
  status: PlayerStatus;
};
