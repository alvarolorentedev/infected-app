jest.mock('../../src/services/game', () => ({
    __esModule: true,
    createGame: jest.fn()
}))

import  { CreateGameResponse, createGame } from "../../src/services/game";
import Game from '../../src/stores/game'
import * as faker from 'faker'
describe('Game Store', () => {

    describe('has action for creating game', () => {
        it('should return an Id', async () => {
            const expectId: string = faker.random.uuid();
            (createGame as jest.Mock<Promise<CreateGameResponse>>)
                .mockReturnValue(Promise.resolve({ id: expectId }))

            const game = new Game()
            await game.createGame()

            expect(createGame).toHaveBeenCalled()
            expect(game.id).toEqual(expectId)
        });
    });
})