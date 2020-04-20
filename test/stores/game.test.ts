import * as faker from 'faker';
import { createGame, joinGame, getGame } from '../../src/services/game';
import { JoinedGame } from '../../src/types/JoinedGame';
import CreatedGame from '../../src/types/CreatedGame';
import { Game as GameType } from '../../src/types/Game';
import GameStatus from '../../src/types/GameStatus';
import PlayerStatus from '../../src/types/PlayerStatus';
import Card from '../../src/types/Card';
import GameStore from '../../src/stores/game';

jest.mock('../../src/services/game', () => ({
  __esModule: true,
  createGame: jest.fn(),
  joinGame: jest.fn(),
  getGame: jest.fn(),
}));

describe('Game Store', () => {
  const game = new GameStore();
  let realSetInterval;

  beforeAll(() => {
    realSetInterval = window.setInterval;
    window.setInterval = jest.fn();
  });

  afterAll(() => {
    window.setInterval = realSetInterval;
  });

  beforeEach(() => {
    game.id = undefined;
    game.error = undefined;
    game.game = undefined;
  });

  describe('has action for creating game', () => {
    it('should return an Id', async () => {
      const expectGameId: string = faker.random.uuid();
      (createGame as jest.Mock<Promise<CreatedGame>>).mockReturnValue(
        Promise.resolve({ id: expectGameId, success: true })
      );

      await game.createGame();

      expect(createGame).toHaveBeenCalled();
      expect(game.id).toEqual(expectGameId);
      expect(game.error).toEqual(undefined);
    });

    it('should have error if not success on creation', async () => {
      const expectId: string = faker.random.uuid();
      (createGame as jest.Mock<Promise<CreatedGame>>).mockReturnValue(
        Promise.resolve({ success: false })
      );

      await game.createGame();

      expect(createGame).toHaveBeenCalled();

      expect(game.id).toEqual(undefined);
      expect(game.error).toEqual('Unable to create game');
    });

    it('should have error if server error', async () => {
      const expectId: string = faker.random.uuid();

      (createGame as jest.Mock<Promise<CreatedGame>>).mockReturnValue(
        Promise.reject(new Error('server failed'))
      );

      await game.createGame();

      expect(createGame).toHaveBeenCalled();

      expect(game.id).toEqual(undefined);
      expect(game.error).toEqual('server failed');
    });
  });

  describe('has action for join game', () => {
    it('should return if success to join', async () => {
      const gameId: string = faker.random.uuid();
      const userId: string = faker.random.uuid();

      (joinGame as jest.Mock<Promise<JoinedGame>>).mockReturnValue(
        Promise.resolve({ success: true })
      );

      await game.joinGame(gameId, userId);

      expect(joinGame).toHaveBeenCalledWith(gameId, userId);
      expect(game.id).toEqual(gameId);
      expect(game.userId).toEqual(userId);
    });

    it('should have error if not success on creation', async () => {
      const gameId: string = faker.random.uuid();
      const userId: string = faker.random.uuid();
      (joinGame as jest.Mock<Promise<JoinedGame>>).mockReturnValue(
        Promise.resolve({ success: false })
      );

      await game.joinGame(gameId, userId);

      expect(joinGame).toHaveBeenCalledWith(gameId, userId);
      expect(game.id).toEqual(undefined);
      expect(game.userId).toEqual(userId);
      expect(game.error).toEqual('Unable to join game');
    });

    it('should have error if server error', async () => {
      const gameId: string = faker.random.uuid();
      const userId: string = faker.random.uuid();
      (joinGame as jest.Mock<Promise<JoinedGame>>).mockReturnValue(
        Promise.reject(new Error('server failed'))
      );

      await game.joinGame(gameId, userId);

      expect(joinGame).toHaveBeenCalledWith(gameId, userId);
      expect(game.id).toEqual(undefined);
      expect(game.userId).toEqual(userId);
      expect(game.error).toEqual('server failed');
    });
  });

  describe('has action to get game info', () => {
    const expectedGame: GameType = {
      id: faker.random.uuid(),
      status: GameStatus.NotStarted,
      players: [
        {
          name: faker.random.uuid(),
          card: Card.Healthy,
          status: PlayerStatus.Free,
        },
      ],
    };
    it('should return a Game from the backend', async () => {
      const gameId: string = faker.random.uuid();
      (getGame as jest.Mock<Promise<GameType>>).mockReturnValue(
        Promise.resolve(expectedGame)
      );

      await game.getGame(gameId);

      expect(getGame).toHaveBeenCalled();
      expect(game.game).toEqual(expectedGame);
      expect(game.error).toEqual(undefined);
    });

    it('should show error if server failed', async () => {
      const gameId: string = faker.random.uuid();
      (getGame as jest.Mock<Promise<GameType>>).mockReturnValue(
        Promise.reject(new Error('server failed'))
      );

      await game.getGame(gameId);

      expect(getGame).toHaveBeenCalled();
      expect(game.game).toEqual(undefined);
      expect(game.error).toEqual('server failed');
    });
  });
});
