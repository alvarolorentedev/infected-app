export default class Game {
    constructor(gameService) {
        this.gameService = gameService;
    }

    createGame() {
        this.id = this.gameService.createGame();
    }
}