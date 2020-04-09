import React, { useState } from 'react';
import { Container, Content, Button, Item, Input, Text } from 'native-base';
import { observer } from 'mobx-react';
import { v4 } from 'uuid';
import useStores from '../utils/useStores';

interface Props {
  navigation: any;
}

export const Home: React.FC<Props> = ({ navigation }) => {
  const [gameId, setGameId] = useState('');
  const { gameStore } = useStores();
  const joinExisitingGame = async (gameId: string) => {
    await gameStore.joinGame(gameId, v4());
    if (!gameStore.error) navigation.navigate('Game');
  };
  const createAndJoinGame = async () => {
    await gameStore.createGame();
    await gameStore.joinGame(gameStore.id, v4());
    if (!gameStore.error) navigation.navigate('Game');
  };

  return (
    <Container>
      <Content>
        <Item regular>
          <Input
            placeholder="game identifier"
            data-testid="gameId-Input"
            value={gameId}
            onChangeText={setGameId}
          />
        </Item>
        <Button
          data-testid="create-button"
          onPress={() =>
            gameId ? joinExisitingGame(gameId) : createAndJoinGame()
          }
        >
          <Text>{gameId ? 'Join Game' : 'New Game'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default observer(Home);
