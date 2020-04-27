import { observable, action } from 'mobx';
import {
  createGame,
  joinGame,
  getGame,
  startGame,
  votePlayer,
  leaveGame,
} from '../services/game';
import { Game } from '../types/Game';

export default class GameStore {
  @observable
  public id: string;

  @observable
  public userId: string;

  @observable
  public game: Game;

  @observable
  public error: string;

  @action
  createGame = async (): Promise<void> => {
    try {
      const result = await createGame();
      if (result.success) {
        this.id = result.id;
        this.error = undefined;
      } else throw new Error('Unable to create game');
    } catch (error) {
      this.id = undefined;
      this.error = error.message;
    }
  };

  @action
  joinGame = async (gameId: string, userId: string): Promise<void> => {
    try {
      this.userId = userId;
      const result = await joinGame(gameId, userId);
      if (result.success) {
        this.id = gameId;
        this.error = undefined;
      } else throw new Error('Unable to join game');
    } catch (error) {
      this.id = undefined;
      this.error = error.message;
    }
  };

  @action
  getGame = async (): Promise<void> => {
    try {
      this.game = await getGame(this.id);
      this.error = undefined;
    } catch (error) {
      this.error = error.message;
    }
  };

  @action
  start = async (): Promise<void> => {
    try {
      await startGame(this.id);
      this.error = undefined;
    } catch (error) {
      this.error = error.message;
    }
  };

  @action
  vote = async (from: string, to: string): Promise<void> => {
    try {
      await votePlayer(this.id, from, to);
      this.error = undefined;
    } catch (error) {
      this.error = error.message;
    }
  };

  @action
  leaveGame = async (): Promise<void> => {
    try {
      await leaveGame(this.id, this.userId);
      this.error = undefined;
    } catch (error) {
      this.error = error.message;
    }
  };
}
