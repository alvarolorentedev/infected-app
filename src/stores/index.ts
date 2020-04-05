import React from 'react'
import * as gameService from '../services/game'
import GameStore from './game'

export type Store = {
    gameStore: GameStore
}

export const storesContext = React.createContext<Store>({
    gameStore: new GameStore()
})