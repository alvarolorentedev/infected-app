import axios from 'axios'
import ENV from '../utils/constants'

const createGameQuery = `mutation { createGame { success, id } }`
const joinGameQuery = `mutation($gameId: String!, $userId: String!){ joinGame(gameId: $gameId, userId: $userId) { success } }`
const GameByIdQuery = `query($gameId: String!){ game(id: $gameId){ id, status, players { name, card, status } } }`

export enum Card {
    Infected = "Infected",
    Healthy = "Healthy"
}

export enum PlayerStatus {
    Free = "Free",
    Quarentained = "Quarentained"
}

export enum GameStatus {
    NotStarted = "NotStarted",
    Started = "Started",
    Ended = "Ended"
}

export type Player = {
    name: string,
    card: Card,
    status: PlayerStatus
}

export type Game = {
    id: string,
    status: GameStatus
    players: Player[]
}

export type CreatedGame = {
    success: boolean
        id?: string
}
export type JoinedGame = {
    success: boolean
}

type GraphQlResponse<T> = {
    data: T
}

type GameResponse = {
    game: Game
}

type CreateGameResponse = {
    createGame: CreatedGame
}

type JoinGameResponse = {
    joinGame: JoinedGame
}

const settings = {
    auth: {
        username: ENV.USERNAME,
        password: ENV.PASSWORD
    }
}

export const createGame = async (): Promise<CreatedGame> => {
    return (await axios.post<GraphQlResponse<CreateGameResponse>>(`${ENV.SERVER_URL}/graphql`, {
        query: createGameQuery,
        variables: {}
    },
    settings)).data.data.createGame
}

export const joinGame = async (gameId: string, userId: string): Promise<JoinedGame> => {
    return (await axios.post<GraphQlResponse<JoinGameResponse>>(`${ENV.SERVER_URL}/graphql`, {
        query: joinGameQuery,
        variables: {
            gameId,
            userId
        }
    },
    settings)).data.data.joinGame
}

export const getGame = async (gameId: string): Promise<Game> => {
    return (await axios.post<GraphQlResponse<GameResponse>>(`${ENV.SERVER_URL}/graphql`, {
        query: GameByIdQuery,
        variables: {
            gameId
        }
    },
    settings)).data.data.game
}