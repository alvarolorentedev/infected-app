import axios from 'axios'

const createGameQuery = `mutation { createGame { id } }`

export type CreateGameResponse = {
    success: boolean
    id?: string
}

export const createGame = async (): Promise<CreateGameResponse> => {
    return (await axios.post<CreateGameResponse>("/graphql", {
        query: createGameQuery,
        variables: {}
    })).data
}