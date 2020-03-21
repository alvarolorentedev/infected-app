import Game from '../../src/viewModels/game'
import { random } from 'faker'

describe('Game View Model', () => {

    describe('has action for creating game', () => {
        const service = {
            createGame: jest.fn()
        }

        it('should return an Id', () => {
            const expectId = random.uuid()
            service.createGame.mockReturnValue(expectId)

            const game = new Game(service)
            game.createGame()

            expect(service.createGame).toHaveBeenCalled()
            expect(game.id).toEqual(expectId)
        });
    });
})