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

import * as React from 'react'
import { shallow } from 'enzyme'
import { Game } from '../../src/views/game'
import * as faker from 'faker'

describe('<Game />', () => {
    const navigation = {
        navigate: jest.fn()
    }

    beforeEach(() => {

    })

    test('should do stuff', () => {
        
    })
})