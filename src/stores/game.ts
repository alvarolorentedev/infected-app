import { observable, action } from 'mobx'
import * as gameService from "../services/game"

export default class Game {
    @observable
    public id : string = ''

    @action
    createGame = async (): Promise<void> => {
        this.id = (await gameService.createGame()).id;
    }
}