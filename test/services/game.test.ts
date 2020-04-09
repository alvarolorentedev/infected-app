import fs from 'fs';
import * as faker from 'faker';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as GameService from '../../src/services/game';
import ENV from '../../src/utils/constants';
import GameStatus from '../../src/types/GameStatus';
import PlayerStatus from '../../src/types/PlayerStatus';
import Card from '../../src/types/Card';

describe('Game Service', () => {
  describe('action to create a new game', () => {
    const createGameGraphqlQuery = fs.readFileSync(
      `${__dirname}/../../src/services/mutations/createGame.graphql`,
      'ascii'
    );
    it('should call the backend to create a new game', async () => {
      const mock = new MockAdapter(axios);
      const gameId = faker.random.uuid();
      mock
        .onPost(`${ENV.SERVER_URL}/graphql`, {
          query: createGameGraphqlQuery,
          variables: {},
        })
        .replyOnce(200, {
          data: { createGame: { id: gameId, success: true } },
        });

      const game = await GameService.createGame();

      expect(game).toEqual({ id: gameId, success: true });
    });
  });

  describe('action to join a new game', () => {
    const joinGameGraphqlQuery = fs.readFileSync(
      `${__dirname}/../../src/services/mutations/joinGame.graphql`,
      'ascii'
    );

    it('should call the backend to create a new game', async () => {
      const mock = new MockAdapter(axios);
      const gameId = faker.random.uuid();
      const userId = faker.random.uuid();
      mock
        .onPost(`${ENV.SERVER_URL}/graphql`, {
          query: joinGameGraphqlQuery,
          variables: {
            gameId,
            userId,
          },
        })
        .replyOnce(200, { data: { joinGame: { success: true } } });

      const game = await GameService.joinGame(gameId, userId);

      expect(game).toEqual({ success: true });
    });
  });

  describe('action to get game information', () => {
    const getGameGraphqlQuery = fs.readFileSync(
      `${__dirname}/../../src/services/queries/getGameById.graphql`,
      'ascii'
    );

    it('should call the backend to create a new game', async () => {
      const mock = new MockAdapter(axios);
      const gameId = faker.random.uuid();
      const expectedGame = {
        data: {
          game: {
            id: faker.random.uuid(),
            status: GameStatus.NotStarted,
            players: [
              {
                name: faker.random.uuid(),
                card: Card.Healthy,
                status: PlayerStatus.Free,
              },
            ],
          },
        },
      };
      mock
        .onPost(`${ENV.SERVER_URL}/graphql`, {
          query: getGameGraphqlQuery,
          variables: {
            gameId,
          },
        })
        .replyOnce(200, { data: { game: expectedGame } });

      const game = await GameService.getGame(gameId);

      expect(game).toEqual(expectedGame);
    });
  });
});
