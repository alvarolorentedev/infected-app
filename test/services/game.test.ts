import * as GameService from '../../src/services/game'
import fs from 'fs'
import * as faker from 'faker'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ENV from '../../src/utils/constants'

describe('Game Service', () => {
    const createGameGraphqlQuery = fs.readFileSync("test/services/createGame.sample.gql", "ascii")
    let newServerUrl = faker.internet.url()

    describe('action to create a new game', () => {
        it('should call the backend to create a new game', async () => {
            const mock = new MockAdapter(axios)
            const gameId = faker.random.uuid()
            mock.onPost(`${ENV.SERVER_URL}/graphql`, {
                query: createGameGraphqlQuery,
                variables: {}
            }).replyOnce(200, { id: gameId })

            const game = await GameService.createGame()

            expect(game).toEqual({ id: gameId })
        })
    })
})