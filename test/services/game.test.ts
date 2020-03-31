import * as GameService from '../../src/services/game'
import fs from 'fs'
import * as faker from 'faker'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ENV from '../../src/utils/constants'

describe('Game Service', () => {
    

    describe('action to create a new game', () => {
        const createGameGraphqlQuery = fs.readFileSync("test/services/createGame.sample.gql", "ascii")
        it('should call the backend to create a new game', async () => {
            const mock = new MockAdapter(axios)
            const gameId = faker.random.uuid()
            mock.onPost(`${ENV.SERVER_URL}/graphql`, {
                query: createGameGraphqlQuery,
                variables: {}
            }).replyOnce(200, { data: { createGame: { id: gameId, success: true }}})

            const game = await GameService.createGame()

            expect(game).toEqual({ id: gameId, success: true })
        })
    })    
    
    describe('action to join a new game', () => {
        const joinGameGraphqlQuery = fs.readFileSync("test/services/joinGame.sample.gql", "ascii")

        it('should call the backend to create a new game', async () => {
            const mock = new MockAdapter(axios)
            const gameId = faker.random.uuid()
            const userId = faker.random.uuid()
            mock.onPost(`${ENV.SERVER_URL}/graphql`, {
                query: joinGameGraphqlQuery,
                variables: {
                    gameId,
                    userId
                }
            }).replyOnce(200, { data: { joinGame: { success: true }}})

            const game = await GameService.joinGame(gameId, userId)

            expect(game).toEqual({ success: true })
        })
    })
})