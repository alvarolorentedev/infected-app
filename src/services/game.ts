import axios from 'axios';

const createGameQuery = `mutation { createGame() { id } }`

export type CreateGameResponse = {
    id: string
}

export const createGame = async (): Promise<CreateGameResponse> => {
    return (await axios.post<CreateGameResponse>("/graphql", createGameQuery)).data
}