import * as React from 'react'
import { Container, Content, Button, Text } from 'native-base'
import { observer } from 'mobx-react'
import { useStores } from "../utils/useStores"

export const Home = () => {
    const { gameStore } = useStores()

    return (
        <Container>
            <Content>
                <Button data-testid="create-button" onClick={gameStore.createGame}>
                    <Text>New Game</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default observer(Home)