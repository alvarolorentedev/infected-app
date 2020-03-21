const mockCreateGame = jest.fn()
jest.mock('../../src/utils/useStores', () => ({
    __esModule: true,
    useStores: () => ({
        gameStore: {
            createGame: mockCreateGame
        }
    })
}))

import * as React from 'react'
import { shallow } from 'enzyme'
import { Home } from '../../src/views/home'

describe('<Home />', () => {
    const navigation = {
        navigate: jest.fn()
    };
    const onCreateGame = jest.fn()

    const wrapper = shallow(<Home navigation={navigation} onCreateGame={onCreateGame}/>)

    beforeEach(() => {
        navigation.navigate.mockClear()
        mockCreateGame.mockClear()
    });

    describe('create game button', () => {
        const createButton = wrapper.find('[data-testid="create-button"]')
        test('should have button with apps icon', () => {
            expect(createButton.exists()).toBeTruthy()
            expect(createButton.contains('New Game')).toBeTruthy()
        });

        test('should create a game when clicked', () => {
            createButton.simulate('click')
            expect(mockCreateGame).toHaveBeenCalled()
        })
    });
})