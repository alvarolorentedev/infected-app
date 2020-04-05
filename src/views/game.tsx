import React, { useEffect } from 'react'
import { Container, Content, Text } from 'native-base'
import { observer } from 'mobx-react'
import { useStores } from "../utils/useStores"


interface Props {
    navigation: any
}

export const Game: React.FC<Props> = () => {
    const { gameStore } = useStores()
    useEffect(() => {
        // Your code here
      }, [])
    return (
        <Container>
            <Content>
                <Text>Game Window</Text>
            </Content>
        </Container>
    )
}

export default observer(Game)