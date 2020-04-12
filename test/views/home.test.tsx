import * as React from 'react';
import { shallow } from 'enzyme';
import * as faker from 'faker';
import { Home } from '../../src/views/home';

const mockCreateGame = jest.fn();
const mockJoinGame = jest.fn();
const mockGameStore = {
  createGame: mockCreateGame,
  joinGame: mockJoinGame,
  id: faker.random.uuid(),
  error: undefined,
};

const waitMiliseconds = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

describe('<Home />', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const expectedUserId = faker.random.uuid();

  beforeEach(() => {
    mockGameStore.error = undefined;
    mockGameStore.id = faker.random.uuid();
    navigation.navigate.mockClear();
    mockCreateGame.mockClear();
    mockJoinGame.mockClear();
  });

  describe('button submit enable/disable state', () => {
    const wrapper = shallow(
      <Home navigation={navigation} gameStore={mockGameStore} />
    );

    test('should be disable by default', () => {
      const createButton = wrapper.find('[data-testid="create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });

    test('should be enable when mandatory fields are set', () => {
      const userIdInput = wrapper.find('[data-testid="userId-Input"]');
      userIdInput.prop('onChangeText')(expectedUserId);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="create-button"]');
      expect(createButton.prop('disabled')).toBeFalsy();
    });

    test('should be disable when mandatory fields are unset', () => {
      const userIdInput = wrapper.find('[data-testid="userId-Input"]');
      userIdInput.prop('onChangeText')(undefined);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });
  });

  describe('create game flow', () => {
    const wrapper = shallow(
      <Home navigation={navigation} gameStore={mockGameStore} />
    );

    beforeAll(() => {
      const userIdInput = wrapper.find('[data-testid="userId-Input"]');
      userIdInput.prop('onChangeText')(expectedUserId);
      wrapper.update();
    });

    test('should have button with New Game text', () => {
      const createButton = wrapper.find('[data-testid="create-button"]');
      expect(createButton.exists()).toBeTruthy();
      expect(createButton.contains('New Game')).toBeTruthy();
    });

    test('should create a game when clicked and navigate', async () => {
      const createButton = wrapper.find('[data-testid="create-button"]');
      mockGameStore.error = undefined;
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(mockCreateGame).toHaveBeenCalled();
      expect(mockJoinGame).toHaveBeenCalledWith(
        mockGameStore.id,
        expectedUserId
      );
      expect(navigation.navigate).toHaveBeenCalledWith('Game');
    });

    test('should not navigate if there is an error', async () => {
      const createButton = wrapper.find('[data-testid="create-button"]');
      mockGameStore.error = faker.random.uuid();
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(navigation.navigate).not.toHaveBeenCalledWith('Game');
    });
  });

  describe('join game flow', () => {
    const wrapper = shallow(
      <Home navigation={navigation} gameStore={mockGameStore} />
    );
    const expectedGameId = faker.random.uuid();

    beforeAll(() => {
      const userIdInput = wrapper.find('[data-testid="userId-Input"]');
      userIdInput.prop('onChangeText')(expectedUserId);
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

      mockGameStore.error = faker.random.uuid();
      joinButton.simulate('press');
      await waitMiliseconds(100);
      expect(navigation.navigate).not.toHaveBeenCalledWith('Game');
    });
  });
});
