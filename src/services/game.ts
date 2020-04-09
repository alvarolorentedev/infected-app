import axios from 'axios';
import ENV from '../utils/constants';
import { Game } from '../types/Game';
import CreatedGame from '../types/CreatedGame';
import { JoinedGame } from '../types/JoinedGame';
// @ts-ignore
import createGameQuery from './mutations/createGame.graphql';
// @ts-ignore
import joinGameQuery from './mutations/joinGame.graphql';
// @ts-ignore
import GameByIdQuery from './queries/getGameById.graphql';
import { GraphQlResponse } from '../types/GraphQlResponse';
import { GameResponse } from '../types/GameResponse';
import { CreateGameResponse } from '../types/CreateGameResponse';
import { JoinGameResponse } from '../types/JoinGameResponse';

const settings = {
  auth: {
    username: ENV.USERNAME,
    password: ENV.PASSWORD,
  },
};

export const createGame = async (): Promise<CreatedGame> => {
  return (
    await axios.post<GraphQlResponse<CreateGameResponse>>(
      `${ENV.SERVER_URL}/graphql`,
      {
        query: createGameQuery,
        variables: {},
      },
      settings
    )
  ).data.data.createGame;
};

export const joinGame = async (
  gameId: string,
  userId: string
): Promise<JoinedGame> => {
  return (
    await axios.post<GraphQlResponse<JoinGameResponse>>(
      `${ENV.SERVER_URL}/graphql`,
      {
        query: joinGameQuery,
        variables: {
          gameId,
          userId,
        },
      },
      settings
    )
  ).data.data.joinGame;
};

export const getGame = async (gameId: string): Promise<Game> => {
  return (
    await axios.post<GraphQlResponse<GameResponse>>(
      `${ENV.SERVER_URL}/graphql`,
      {
        query: GameByIdQuery,
        variables: {
          gameId,
        },
      },
      settings
    )
  ).data.data.game;
};
