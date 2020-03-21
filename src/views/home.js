import * as React from 'react'
import { Container, Content, Button, Text } from 'native-base'

export default ({ navigation, onCreateGame }) => (
      <Container>
        <Content>
            <Button data-testid="create-button" onClick={onCreateGame}>
                <Text>New Game</Text>
            </Button>
        </Content>
      </Container>
    )