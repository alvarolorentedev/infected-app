import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Home from './src/views/home';
import Game from './src/views/game';
import logger from './src/utils/logger';

const Stack = createStackNavigator();

export default (App) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        /* eslint-disable global-require, @typescript-eslint/camelcase */
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        /* eslint-enable global-require, @typescript-eslint/camelcase */
      } catch (error) {
        logger.error(error);
      }
      setReady(true);
    })();
  }, []);
  return (
    ready && (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};
