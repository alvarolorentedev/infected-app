const mockCreateGame = jest.fn()
const mockJoinGame = jest.fn()
const mockId = faker.random.uuid()
jest.mock('../../src/utils/useStores', () => ({
    __esModule: true,
    useStores: () => ({
        gameStore: {
            createGame: mockCreateGame,
            joinGame: mockJoinGame,
            id: mockId
        }
    })
}))
jest.mock('uuid', () => ({
    __esModule: true,
    v4: jest.fn()
}))

import * as React from 'react'
import { shallow } from 'enzyme'
import { Home } from '../../src/views/home'
import { v4 } from 'uuid'
import * as faker from 'faker'

const waitMiliseconds = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time))

describe('<Home />', () => {
    const navigation = {
        navigate: jest.fn()
    }
    const expectedUserId = faker.random.uuid()

    beforeEach(() => {
        navigation.navigate.mockClear()
        mockCreateGame.mockClear()
        v4.mockClear()
        v4.mockReturnValue(expectedUserId)
    })

    describe('create game flow', () => {
        const wrapper = shallow(<Home navigation={navigation}/>)

        const createButton = wrapper.find('[data-testid="create-button"]')
        test('should have button with New Game text', () => {
            expect(createButton.exists()).toBeTruthy()
            expect(createButton.contains('New Game')).toBeTruthy()
        })

        test('should create a game when clicked', async () => {
            createButton.simulate('press')
            await waitMiliseconds(100)
            expect(mockCreateGame).toHaveBeenCalled()
            expect(mockJoinGame).toHaveBeenCalledWith(mockId, expectedUserId)
            expect(navigation.navigate).toHaveBeenCalledWith("Game")

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

        test('should create a game when clicked', async () => { 
            const joinButton = wrapper.find('[data-testid="create-button"]')

            joinButton.simulate('press')
            await waitMiliseconds(100)
            expect(mockJoinGame).toHaveBeenCalledWith(expectedGameId, expectedUserId)
            expect(navigation.navigate).toHaveBeenCalledWith("Game")
        })
    })
})