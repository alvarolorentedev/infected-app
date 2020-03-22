import React from 'react'
import * as gameService from '../services/game'
import Game from './game'

export type Store = {
    gameStore: Game
}

export const storesContext = React.createContext<Store>({
    gameStore: new Game()
})