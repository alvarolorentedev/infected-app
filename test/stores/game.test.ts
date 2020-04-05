jest.mock('../../src/services/game', () => ({
    __esModule: true,
    createGame: jest.fn(),
    joinGame: jest.fn()
}))

import  { createGame, CreatedGame, joinGame, JoinedGame } from "../../src/services/game"
import Game from '../../src/stores/game'
import * as faker from 'faker'
describe('Game Store', () => {

    const game = new Game()
    beforeEach(() => {
        game.id = ''
        game.error = ''
    })

    describe('has action for creating game', () => {
        it('should return an Id', async () => {
            const expectGameId: string = faker.random.uuid();
            (createGame as jest.Mock<Promise<CreatedGame>>)
                .mockReturnValue(Promise.resolve({ id: expectGameId, success: true }))
            
            await game.createGame()

            expect(createGame).toHaveBeenCalled()
            expect(game.id).toEqual(expectGameId)
            expect(game.error).toEqual(undefined)
        })        
        
        it('should have error if not success on creation', async () => {
            const expectId: string = faker.random.uuid();
            (createGame as jest.Mock<Promise<CreatedGame>>)
                .mockReturnValue(Promise.resolve({ success: false }));
            
            await game.createGame()

            expect(createGame).toHaveBeenCalled()
            
            expect(game.id).toEqual(undefined)
            expect(game.error).toEqual('Unable to create game')
        })

        it('should have error if server error', async () => {
            const expectId: string = faker.random.uuid();
            
            (createGame as jest.Mock<Promise<CreatedGame>>)
                .mockReturnValue(Promise.reject(new Error('server failed')))
            
            await game.createGame()

            expect(createGame).toHaveBeenCalled()
            
            expect(game.id).toEqual(undefined)
            expect(game.error).toEqual('server failed')
        })
    })    
    
    describe('has action for join game', () => {
        it('should return if success to join', async () => {
            const gameId: string = faker.random.uuid()
            const userId: string = faker.random.uuid();

            (joinGame as jest.Mock<Promise<JoinedGame>>)
                .mockReturnValue(Promise.resolve({ success: true }))

            await game.joinGame(gameId, userId)

            expect(joinGame).toHaveBeenCalledWith(gameId, userId)
            expect(game.id).toEqual(gameId)
        })

        it('should have error if not success on creation', async () => {
            const gameId: string = faker.random.uuid()
            const userId: string = faker.random.uuid();
            (joinGame as jest.Mock<Promise<JoinedGame>>)
                .mockReturnValue(Promise.resolve({ success: false }))

            await game.joinGame(gameId, userId)

            expect(joinGame).toHaveBeenCalledWith(gameId, userId)
            expect(game.id).toEqual(undefined)
            expect(game.error).toEqual('Unable to join game')
        })

        it('should have error if server error', async () => {
            const gameId: string = faker.random.uuid()
            const userId: string = faker.random.uuid();
            (joinGame as jest.Mock<Promise<JoinedGame>>)
                .mockReturnValue(Promise.reject(new Error('server failed')))

            await game.joinGame(gameId, userId)

            expect(joinGame).toHaveBeenCalledWith(gameId, userId)
            expect(game.id).toEqual(undefined)
            expect(game.error).toEqual('server failed')
        })
    })
})