import axios from 'axios';
import Base64 from 'Base64';
import ENV from '../utils/constants';
import { Game } from '../types/Game';
import CreatedGame from '../types/CreatedGame';
import { SimpleResponse } from '../types/SimpleResponse';
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import createGameQuery from './mutations/createGame.graphql';
// @ts-ignore
import joinGameQuery from './mutations/joinGame.graphql';
// @ts-ignore
import leaveGameQuery from './mutations/leaveGame.graphql';
// @ts-ignore
import startGameQuery from './mutations/startGame.graphql';
// @ts-ignore
import votePlayerQuery from './mutations/votePlayer.graphql';
// @ts-ignore
import GameByIdQuery from './queries/getGameById.graphql';
/* eslint-enable @typescript-eslint/ban-ts-ignore */
import { GraphQlResponse } from '../types/GraphQlResponse';
import { GameResponse } from '../types/GameResponse';
import { CreateGameResponse } from '../types/CreateGameResponse';
import { JoinGameResponse } from '../types/JoinGameResponse';
import { StartGameResponse } from '../types/StartGameResponse';
import { VotePlayerResponse } from '../types/VotePlayerResponse';
import { LeaveGameResponse } from '../types/LeaveGameResponse';

const settings = {
  headers: {
    Authorization: `Basic ${Base64.btoa(
      `${ENV.SERVER_USERNAME}:${ENV.SERVER_PASSWORD}`
    )}`,
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
): Promise<SimpleResponse> => {
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

export const leaveGame = async (
  gameId: string,
  userId: string
): Promise<SimpleResponse> => {
  return (
    await axios.post<GraphQlResponse<LeaveGameResponse>>(
      `${ENV.SERVER_URL}/graphql`,
      {
        query: leaveGameQuery,
        variables: {
          gameId,
          userId,
        },
      },
      settings
    )
  ).data.data.leaveGame;
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

export const startGame = async (gameId: string): Promise<SimpleResponse> => {
  return (
    await axios.post<GraphQlResponse<StartGameResponse>>(
      `${ENV.SERVER_URL}/graphql`,
      {
        query: startGameQuery,
        variables: {
          gameId,
        },
      },
      settings
    )
  ).data.data.startGame;
};

export const votePlayer = async (
  gameId: string,
  from: string,
  to: string
): Promise<SimpleResponse> => {
  return (
    await axios.post<GraphQlResponse<VotePlayerResponse>>(
      `${ENV.SERVER_URL}/graphql`,
      {
        query: votePlayerQuery,
        variables: {
          gameId,
          from,
          to,
        },
      },
      settings
    )
  ).data.data.votePlayer;
};
