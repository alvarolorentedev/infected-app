import React, { useState } from 'react'
import { Container, Content, Button, Item, Input, Text } from 'native-base'
import { observer } from 'mobx-react'
import { useStores } from "../utils/useStores"


interface Props {
    navigation: any
}

export const Home: React.FC<Props> = () => {
    const [gameId, setGameId] = useState("");
    const { gameStore } = useStores()

    return (
        <Container>
            <Content>
                <Item regular>
                    <Input placeholder='game identifier' data-testid="gameId-Input" value={gameId} onChangeText={setGameId}/>
                </Item>
                <Button data-testid="create-button" onPress={() => gameId? gameStore.joinGame(gameId) : gameStore.createGame()}>
                    <Text>{gameId? "Join Game" : "New Game"}</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default observer(Home)