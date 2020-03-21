import { observable, action } from 'mobx'

export default class Game {
    @observable
    id = ''

    constructor(gameService) {
        this.gameService = gameService;
    }

    @action
    createGame = () => {
        this.id = this.gameService.createGame();
    }
}