import { observable, action } from 'mobx';
import { createGame, joinGame, getGame } from '../services/game';
import { Game } from '../types/Game';

export default class GameStore {
  @observable
  public id: string;

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
  getGame = async (gameId: string): Promise<void> => {
    try {
      this.game = await getGame(gameId);
      this.error = undefined;
    } catch (error) {
      this.id = undefined;
      this.error = error.message;
    }
  };
}
