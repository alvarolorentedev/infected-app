const mockCreateGame = jest.fn()
const mockJoinGame = jest.fn()
jest.mock('../../src/utils/useStores', () => ({
    __esModule: true,
    useStores: () => ({
        gameStore: {
            createGame: mockCreateGame,
            joinGame: mockJoinGame
        }
    })
}))

import * as React from 'react'
import { shallow } from 'enzyme'
import { Home } from '../../src/views/home'
import * as faker from 'faker'

describe('<Home />', () => {
    const navigation = {
        navigate: jest.fn()
    }

    beforeEach(() => {
        navigation.navigate.mockClear()
        mockCreateGame.mockClear()
    })

    describe('create game flow', () => {
        const wrapper = shallow(<Home navigation={navigation}/>)

        const createButton = wrapper.find('[data-testid="create-button"]')
        test('should have button with New Game text', () => {
            expect(createButton.exists()).toBeTruthy()
            expect(createButton.contains('New Game')).toBeTruthy()
        })

        test('should create a game when clicked', () => {
            createButton.simulate('press')
            expect(mockCreateGame).toHaveBeenCalled()
        })
    })

    describe('join game flow', () => {
        let wrapper = shallow(<Home navigation={navigation}/>)
        let expectedGameId = faker.random.uuid()

        beforeAll(() => {
            const gameIdInput = wrapper.find('[data-testid="gameId-Input"]')
            gameIdInput.prop('onChangeText')(expectedGameId)
            wrapper.update()
        });
        test('should have button with Join Game text', () => {
            const joinButton = wrapper.find('[data-testid="create-button"]')

            expect(joinButton.exists()).toBeTruthy()
            expect(joinButton.contains('Join Game')).toBeTruthy()
        })

        test('should create a game when clicked', () => { 
            const joinButton = wrapper.find('[data-testid="create-button"]')

            joinButton.simulate('press')
            expect(mockJoinGame).toHaveBeenCalledWith(expectedGameId)
        })
    })
})