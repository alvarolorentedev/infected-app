import React from 'react';

import { storiesOf } from '@storybook/react-native';
import NativeBaseWrapper from '../NativeBaseWrapper';

import Home from '../../../src/views/home';

const game = {
    "id": "qert345tf",
    "status": "NotStarted",
    "players": [
        {
            "name": "pepe",
            "card": "Healthy",
            "status": "Free"
        },
        {
            "name": "pepa",
            "card": "Healthy",
            "status": "Free"
        },
        {
            "name": "pipa",
            "card": "Infected",
            "status": "Free"
        }
    ]
}

const baseGameStore = {joinGame: () => {}, createGame: () => {}, getGame: () => {}, game } 
const basenavigation = { navigate: () => {} }

storiesOf('Home', module)
.addDecorator(getStory => <NativeBaseWrapper>{getStory()}</NativeBaseWrapper>)
.add('Home without error', () => <Home gameStore={{ ...baseGameStore }} navigation={basenavigation}/>)
.add('Home with error', () => <Home gameStore={{ error: "mi awesome error message", ...baseGameStore }} navigation={basenavigation}/>);