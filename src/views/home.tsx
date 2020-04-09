import React, { useState } from 'react';
import { Container, Content, Button, Item, Input, Text } from 'native-base';
import { observer } from 'mobx-react';
import { v4 } from 'uuid';
import { StackNavigationProp } from '@react-navigation/stack';
import useStores from '../utils/useStores';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const Home: React.FC<Props> = ({ navigation }: Props) => {
  const [gameId, setGameId] = useState('');
  const { gameStore } = useStores();
  const joinExisitingGame = async (gameIdParam: string) => {
    await gameStore.joinGame(gameIdParam, v4());
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
            /* eslint-disable-next-line prettier/prettier */
            gameId ? joinExisitingGame(gameId) : createAndJoinGame()}
        >
          <Text>{gameId ? 'Join Game' : 'New Game'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default observer(Home);
