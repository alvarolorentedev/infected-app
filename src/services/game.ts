import axios from 'axios'
import ENV from '../utils/constants'

const createGameQuery = `mutation { createGame { success, id } }`
const joinGameQuery = `mutation($gameId: String!, $userId: String!){ joinGame(gameId: $gameId, userId: $userId) { success } }`

export type createdGame = {
    success: boolean
        id?: string
}
export type joinedGame = {
    success: boolean
}
type GraphQlResponse<T> = {
    data: T
}
type CreateGameResponse = {
    createGame: createdGame
}

type JoinGameResponse = {
    joinGame: joinedGame
}

const settings = {
    auth: {
        username: ENV.USERNAME,
        password: ENV.PASSWORD
    }
}

export const createGame = async (): Promise<createdGame> => {
    return (await axios.post<GraphQlResponse<CreateGameResponse>>(`${ENV.SERVER_URL}/graphql`, {
        query: createGameQuery,
        variables: {}
    },
    settings)).data.data.createGame
}
export const  joinGame = async (gameId: string, userId: string): Promise<joinedGame> => {
    return (await axios.post<GraphQlResponse<JoinGameResponse>>(`${ENV.SERVER_URL}/graphql`, {
        query: joinGameQuery,
        variables: {
            gameId,
            userId
        }
    },
    settings)).data.data.joinGame
}