import { observable, action } from 'mobx';
import { createGame, joinGame, getGame } from '../services/game';
import { Game } from '../types/Game';
import { Player } from '../types/Player';
import GameStatus from '../types/GameStatus';

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
        this.intervalId = window.setInterval(() => {
          this.getGame(gameId);
        }, 5000);
      } else throw new Error('Unable to join game');
    } catch (error) {
      this.id = undefined;
      this.error = error.message;
    }
  };

  private intervalId = undefined;

  @action
  getGame = async (gameId: string): Promise<void> => {
    try {
      this.game = await getGame(gameId);
      if (this.game.status === GameStatus.Ended) clearInterval(this.intervalId);
      this.error = undefined;
    } catch (error) {
      this.id = undefined;
      this.error = error.message;
    }
  };

  @action
  start = async (): Promise<void> => {
    Promise.reject(Error('Not Implemented'));
  };

  @action
  vote = async (): Promise<void> => {
    Promise.reject(Error('Not Implemented'));
  };
}
