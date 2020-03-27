import axios from 'axios'
import ENV from '../utils/constants'

const createGameQuery = `mutation { createGame { success, id } }`

export type createdGame = {
    success: boolean
        id?: string
}
type GraphQlResponse<T> = {
    data: T
}
type CreateGameResponse = {
    createGame: createdGame
}

export const createGame = async (): Promise<createdGame> => {
    return (await axios.post<GraphQlResponse<CreateGameResponse>>(`${ENV.SERVER_URL}/graphql`, {
        query: createGameQuery,
        variables: {}
    },
    {
        auth: {
            username: ENV.USERNAME,
            password: ENV.PASSWORD
        }
    })).data.data.createGame
}