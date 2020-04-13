import axios from 'axios';
import Base64 from 'Base64';
import ENV from '../utils/constants';
import { Game } from '../types/Game';
import CreatedGame from '../types/CreatedGame';
import { JoinedGame } from '../types/JoinedGame';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import createGameQuery from './mutations/createGame.graphql';
// @ts-ignore
import joinGameQuery from './mutations/joinGame.graphql';
// @ts-ignore
import GameByIdQuery from './queries/getGameById.graphql';
/* eslint-enable @typescript-eslint/ban-ts-ignore */
import { GraphQlResponse } from '../types/GraphQlResponse';
import { GameResponse } from '../types/GameResponse';
import { CreateGameResponse } from '../types/CreateGameResponse';
import { JoinGameResponse } from '../types/JoinGameResponse';

const settings = {
  headers: {
    Authorization: `Basic YWRtaW46c3VwZXJzZWNyZXQ=`,
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
