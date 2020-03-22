import * as GameService from '../../src/services/game'
import fs from 'fs'
import { random } from 'faker'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

describe('Game Service', () => {
    const createGameGraphqlQuery = fs.readFileSync("test/services/createGame.sample.gql", "ascii");

    describe('action to create a new game', () => {
        it('should call the backend to create a new game', async () => {
            const mock = new MockAdapter(axios)
            const gameId = random.uuid()
            mock.onPost("/graphql", createGameGraphqlQuery).replyOnce(200, { id: gameId })

            const game = await GameService.createGame();

            expect(game).toEqual({ id: gameId })
        });
    });
})