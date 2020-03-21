import axios from 'axios';

const createGameQuery = `mutation { createGame() { id } }`

export const createGame = async () => {
    return (await axios.post("/graphql", createGameQuery)).data
}