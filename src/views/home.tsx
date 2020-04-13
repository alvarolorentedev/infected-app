import React, { useState } from 'react';
import {
  Container,
  Content,
  Button,
  Item,
  Input,
  Text,
  Form,
  Label,
  Toast,
} from 'native-base';
import { observer } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image, Alert } from 'react-native';
import Base64 from 'Base64';
import useStores from '../utils/useStores';
import GameStore from '../stores/game';

import ENV from '../utils/constants';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  gameStore: GameStore;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  form: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  picker: { display: 'flex', justifyContent: 'space-between', marginLeft: 10 },
  button: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});

export const Home: React.FC<Props> = ({ navigation, gameStore }: Props) => {
  Alert.alert(
    'debug',
    `${ENV.USERNAME}:${ENV.PASSWORD} ` +
      `Basic ${Base64.btoa(`${ENV.USERNAME}:${ENV.PASSWORD}`)}`,
    [{ text: 'OK' }],
    { cancelable: false }
  );
  const [gameId, setGameId] = useState('');
  const [userId, setUserId] = useState('');
  const [readyForGame, setReadyForGame] = useState(false);
  const joinExisitingGame = async (gameIdParam: string) => {
    await gameStore.joinGame(gameIdParam, userId);
    if (!gameStore.error) navigation.navigate('Game');
    else Toast.show({ text: gameStore.error, buttonText: 'Okay' });
  };
  const createAndJoinGame = async () => {
    await gameStore.createGame();
    await gameStore.joinGame(gameStore.id, userId);
    if (!gameStore.error) navigation.navigate('Game');
    else Toast.show({ text: gameStore.error, buttonText: 'Okay' });
  };
  const UpdateUsername = (name) => {
    setUserId(name);
    if (name) setReadyForGame(true);
    else setReadyForGame(false);
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              data-testid="userId-Input"
              value={userId}
              onChangeText={UpdateUsername}
            />
          </Item>
          <Item floatingLabel>
            <Label>Game identifier (Optional)</Label>
            <Input
              data-testid="gameId-Input"
              value={gameId}
              onChangeText={setGameId}
            />
          </Item>
        </Form>
        <Button
          block
          dark
          disabled={!readyForGame}
          style={styles.button}
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

export default observer((props) =>
  Home({ gameStore: useStores().gameStore, ...props })
);
