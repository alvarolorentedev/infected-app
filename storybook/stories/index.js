import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Game from '../../src/views/game';
import Home from '../../src/views/home';

const baseGameStore = {joinGame: () => {}, createGame: () => {}  } 
const basenavigation = { navigate: () => {} }

storiesOf('Game', module)
.add('Game', () => <Game gameStore={baseGameStore} navigation={basenavigation}  />);

storiesOf('Home', module)
.add('Home without error', () => <Home gameStore={{ ...baseGameStore }} navigation={basenavigation}/>)
.add('Home with error', () => <Home gameStore={{ error: "mi awesome error message", ...baseGameStore }} navigation={basenavigation}/>);
