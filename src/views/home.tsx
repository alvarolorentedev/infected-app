import React, { useState, useEffect } from 'react'
import { Container, Content, Button, Text } from 'native-base'
import { observer } from 'mobx-react'
import { useStores } from "../utils/useStores"
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    navigation: any
}

export const Home: React.FC<Props> = () => {
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
    const { gameStore } = useStores()

    return (
        <Container>
            {ready && <Content>
                <Text>{gameStore.id || "No ID Created" }</Text>
                <Button data-testid="create-button" onPress={gameStore.createGame}>
                    <Text>New Game</Text>
                </Button>
            </Content>}
        </Container>
    )
}

export default observer(Home)