import * as React from 'react';
import { shallow } from 'enzyme';
import * as faker from 'faker';
import { Game } from '../../src/views/game';

const mockCreateGame = jest.fn();
const mockJoinGame = jest.fn();
const mockId = faker.random.uuid();
jest.mock('../../src/utils/useStores', () => ({
  __esModule: true,
  useStores: () => ({
    gameStore: {
      createGame: mockCreateGame,
      joinGame: mockJoinGame,
      id: mockId,
    },
  }),
}));

describe('<Game />', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {});

  test('should do stuff', () => {});
});
