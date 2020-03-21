import React from 'react'
import * as gameService from '../services/game'
import Game from './game'

export const storesContext = React.createContext({
    gameStore: new Game(gameService)
})