import * as React from 'react';
import { shallow } from 'enzyme';
import { v4 } from 'uuid';
import * as faker from 'faker';
import { Home } from '../../src/views/home';

const mockCreateGame = jest.fn();
const mockJoinGame = jest.fn();
const mockGameStore = {
  gameStore: {
    createGame: mockCreateGame,
    joinGame: mockJoinGame,
    id: faker.random.uuid(),
    error: undefined,
  },
};
jest.mock('../../src/utils/useStores', () => ({
  __esModule: true,
  default: () => mockGameStore,
}));
jest.mock('uuid', () => ({
  __esModule: true,
  v4: jest.fn(),
}));

const waitMiliseconds = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

describe('<Home />', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const expectedUserId = faker.random.uuid();

  beforeEach(() => {
    mockGameStore.gameStore.error = undefined;
    mockGameStore.gameStore.id = faker.random.uuid();
    navigation.navigate.mockClear();
    mockCreateGame.mockClear();
    mockJoinGame.mockClear();
    v4.mockClear();
    v4.mockReturnValue(expectedUserId);
  });

  describe('create game flow', () => {
    const wrapper = shallow(<Home navigation={navigation} />);

    const createButton = wrapper.find('[data-testid="create-button"]');
    test('should have button with New Game text', () => {
      expect(createButton.exists()).toBeTruthy();
      expect(createButton.contains('New Game')).toBeTruthy();
    });

    test('should create a game when clicked and navigate', async () => {
      mockGameStore.gameStore.error = undefined;
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(mockCreateGame).toHaveBeenCalled();
      expect(mockJoinGame).toHaveBeenCalledWith(
        mockGameStore.gameStore.id,
        expectedUserId
      );
      expect(navigation.navigate).toHaveBeenCalledWith('Game');
    });

    test('should not navigate if there is an error', async () => {
      mockGameStore.gameStore.error = faker.random.uuid();
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(navigation.navigate).not.toHaveBeenCalledWith('Game');
    });
  });

  describe('join game flow', () => {
    const wrapper = shallow(<Home navigation={navigation} />);
    const expectedGameId = faker.random.uuid();

    beforeAll(() => {
      const gameIdInput = wrapper.find('[data-testid="gameId-Input"]');
      gameIdInput.prop('onChangeText')(expectedGameId);
      wrapper.update();
    });
    test('should have button with Join Game text', () => {
      const joinButton = wrapper.find('[data-testid="create-button"]');

      expect(joinButton.exists()).toBeTruthy();
      expect(joinButton.contains('Join Game')).toBeTruthy();
    });

    test('should join a game when clicked and navigate', async () => {
      const joinButton = wrapper.find('[data-testid="create-button"]');

      joinButton.simulate('press');
      await waitMiliseconds(100);
      expect(mockJoinGame).toHaveBeenCalledWith(expectedGameId, expectedUserId);
      expect(navigation.navigate).toHaveBeenCalledWith('Game');
    });

    test('should not navigate if there is an error', async () => {
      const joinButton = wrapper.find('[data-testid="create-button"]');

      mockGameStore.gameStore.error = faker.random.uuid();
      joinButton.simulate('press');
      await waitMiliseconds(100);
      expect(navigation.navigate).not.toHaveBeenCalledWith('Game');
    });
  });
});
