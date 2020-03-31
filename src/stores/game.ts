import { observable, action } from 'mobx'
import * as gameService from "../services/game"

export default class Game {
    @observable
    public id : string

    @observable
    error: string

    @action
    createGame = async (): Promise<void> => {
        try {
            const result = await gameService.createGame()
            if(result.success){
                this.id = result.id
                this.error = undefined
            }
            else
                throw new Error('Unable to create game')
        }
        catch (error) {
            this.id = undefined
            this.error = error.message
        }
    }
    
    @action
    joinGame = async (gameId: string, userId: string): Promise<void> => {
        try {
            const result = await gameService.joinGame(gameId, userId)
            if(result.success){
                this.id = gameId
                this.error = undefined
            }
            else
                throw new Error('Unable to join game')
        }
        catch (error) {
            this.id = undefined
            this.error = error.message
        }
    }
}