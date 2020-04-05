import { Card } from '../types/Card';
import { PlayerStatus } from '../types/PlayerStatus';

export type Player = {
    name: string;
    card: Card;
    status: PlayerStatus;
};
