import axios from 'axios';

export const createGame = async () => {
    return (await axios.post("/graphql")).data
}