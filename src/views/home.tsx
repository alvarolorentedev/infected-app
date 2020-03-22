import * as React from 'react'
import { Container, Content, Button, Text } from 'native-base'
import { observer } from 'mobx-react'
import { useStores } from "../utils/useStores"

interface Props {
    navigation: any
}

export const Home: React.FC<Props> = () => {
    const { gameStore } = useStores()

    return (
        <Container>
            <Content>
                <Button data-testid="create-button" onPress={gameStore.createGame}>
                    <Text>New Game</Text>
                </Button>
            </Content>
        </Container>
    )
}

export default observer(Home)