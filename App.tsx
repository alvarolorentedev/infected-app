import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/views/home'
import Game from './src/views/game'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

const Stack = createStackNavigator()

export default App => {
  const [ready, setReady] = useState(false);
    useEffect(() => { 
        (async () => {
            try {
                await Font.loadAsync({
                    Roboto: require('native-base/Fonts/Roboto.ttf'),
                    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
                    ...Ionicons.font,
                  });   
            } catch (error) {
                console.log(error)
            }
            setReady(true)
          })()
      }, []);
  return (
    ready && <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}