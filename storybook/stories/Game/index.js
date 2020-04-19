import React from 'react';

import { storiesOf } from '@storybook/react-native';
import RoundStatus from '../../../src/types/RoundStatus'
import GameStatus from '../../../src/types/GameStatus'
import PlayerStatus from '../../../src/types/PlayerStatus'
import Card from '../../../src/types/Card'

import Game from '../../../src/views/game';
import NativeBaseWrapper from '../NativeBaseWrapper';

const userId = "pepe"
const game = {
    id: "qert345tf",
    status: GameStatus.NotStarted,
    round: RoundStatus.Other,
    players: [
        {
            name: userId,
            card: Card.Healthy,
            status: PlayerStatus.Free
        },
        {
            name: "pepa",
            card: Card.Healthy,
            status: PlayerStatus.Free
        },
        {
            name: "pipa",
            card: Card.Infected,
            status: PlayerStatus.Free
        },
        {
            name: "pope",
            card: Card.Infected,
            status: PlayerStatus.Free
        },
        {
            name: "pepito",
            card: Card.Healthy,
            status: PlayerStatus.Quarentained
        },
        {
            name: "pipita",
            card: Card.Infected,
            status: PlayerStatus.Quarentained
        }
    ]
}
const playersInitial = game.players.map(player =>{
    return {...player, status: PlayerStatus.Free }
})
const playersWithCurrentPlayerQuarentained = game.players.map(player => {
    if(player.name === userId){
        return {...player, status: PlayerStatus.Quarentained}
    }
    return {...player}
})
const baseGameStore = {joinGame: () => {}, createGame: () => {}, getGame: () => {}, start: () => {}, vote: () => {}, userId, game } 
const basenavigation = { navigate: () => {} }


storiesOf('Game', module)
.addDecorator(getStory => <NativeBaseWrapper>{getStory()}</NativeBaseWrapper>)
.add('Game initial healthy', () => <Game gameStore={{...baseGameStore, game: {...game, players: playersInitial}}} navigation={basenavigation}  />)
.add('Game initial infected', () => <Game gameStore={{...baseGameStore, game: {...game, players: playersInitial}, userId: "pipa"}} navigation={basenavigation}  />)
.add('Game started separated healthy free', () => <Game gameStore={{ ...baseGameStore, game: {...game, round: RoundStatus.Separated, status: GameStatus.Started}}} navigation={basenavigation}  />)
.add('Game started separated infected free', () => <Game gameStore={{ ...baseGameStore, game: {...game, round: RoundStatus.Separated, status: GameStatus.Started}, userId: "pipa"}} navigation={basenavigation}  />)
.add('Game started join healthy free', () => <Game gameStore={{ ...baseGameStore, game: {...game, round: RoundStatus.Join, status: GameStatus.Started}}} navigation={basenavigation}  />)
.add('Game started join infected free', () => <Game gameStore={{ ...baseGameStore, game: {...game, round: RoundStatus.Join, status: GameStatus.Started}, userId: "pipa"}} navigation={basenavigation}  />)
.add('Game started separated healthy quarentained', () => <Game gameStore={{ ...baseGameStore, game: {...game, players: playersWithCurrentPlayerQuarentained, round: RoundStatus.Separated, status: GameStatus.Started}}} navigation={basenavigation}  />)
.add('Game started separated infected quarentained', () => <Game gameStore={{ ...baseGameStore, game: {...game, players: playersWithCurrentPlayerQuarentained, round: RoundStatus.Separated, status: GameStatus.Started}, userId: "pipita"}} navigation={basenavigation}  />)
.add('Game started join healthy quarentained', () => <Game gameStore={{ ...baseGameStore, game: {...game, players: playersWithCurrentPlayerQuarentained, round: RoundStatus.Join, status: GameStatus.Started}}} navigation={basenavigation}  />)
.add('Game started join infected quarentained', () => <Game gameStore={{ ...baseGameStore, game: {...game, players: playersWithCurrentPlayerQuarentained, round: RoundStatus.Join, status: GameStatus.Started}, userId: "pipita"}} navigation={basenavigation}  />);