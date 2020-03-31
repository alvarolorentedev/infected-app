import React from 'react'
import { Container, Content, Text } from 'native-base'
import { observer } from 'mobx-react'


interface Props {
    navigation: any
}

export const Game: React.FC<Props> = () => {
    return (
        <Container>
            <Content>
                <Text>Game Window</Text>
            </Content>
        </Container>
    )
}

export default observer(Game)