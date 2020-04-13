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
import { Alert } from 'react-native';

const settings = {
  headers: {
    Authorization: `Basic ${Base64.btoa(
      `${ENV.SERVER_USERNAME}:${ENV.SERVER_PASSWORD}`
    )}`,
  },
};

export const createGame = async (): Promise<CreatedGame> => {
  try {
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
  } catch (error) {
    Alert.alert('error Create Game', JSON.stringify(error), [{ text: 'OK' }], {
      cancelable: false,
    });
    return null;
  }
};

export const joinGame = async (
  gameId: string,
  userId: string
): Promise<JoinedGame> => {
  try {
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
  } catch (error) {
    Alert.alert('error Join Game', JSON.stringify(error), [{ text: 'OK' }], {
      cancelable: false,
    });
    return null;
  }
};

export const getGame = async (gameId: string): Promise<Game> => {
  try {
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
  } catch (error) {
    Alert.alert('error Get Game', JSON.stringify(error), [{ text: 'OK' }], {
      cancelable: false,
    });
    return null;
  }
};
