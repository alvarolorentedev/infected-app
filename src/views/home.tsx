import React, { useState } from 'react'
import { Container, Content, Button, Item, Input, Text } from 'native-base'
import { observer } from 'mobx-react'
import { useStores } from "../utils/useStores"
import { v4 } from 'uuid'


interface Props {
    navigation: any
}



export const Home: React.FC<Props> = ({navigation}) => {
    const [gameId, setGameId] = useState("");
    const { gameStore } = useStores()
    const joinExisitingGame = async (gameId: string) => {
        await gameStore.joinGame(gameId, v4())
        navigation.navigate('Game')
    }    
    const createAndJoinGame = async () => {
        await gameStore.createGame() 
        await gameStore.joinGame(gameStore.id, v4())
        navigation.navigate('Game') 
    }

    return (
        <Container>
            <Content>
                <Item regular>
                    <Input placeholder='game identifier' data-testid="gameId-Input" value={gameId} onChangeText={setGameId}/>
                </Item>
                <Button data-testid="create-button" onPress={ () => gameId? joinExisitingGame(gameId) : createAndJoinGame()}>
                    <Text>{gameId? "Join Game" : "New Game"}</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default observer(Home)