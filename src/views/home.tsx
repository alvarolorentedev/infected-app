import React, { useState } from 'react';
import { Container, Content, Button, Item, Input, Text, Form, Label, Picker, Icon } from 'native-base';
import { observer } from 'mobx-react';
import uuid from 'uuid-random';
import { StackNavigationProp } from '@react-navigation/stack';
import useStores from '../utils/useStores';
import GameStore from '../stores/game';
import { StyleSheet, Image } from 'react-native';

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
    height: "100%",
  },
  logo: { width: 150, height: 150, marginTop: "auto", marginBottom: 0, marginLeft: "auto", marginRight: "auto"},
  form: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: "auto",
    marginBottom: "auto"
  },
  picker: { display: "flex", justifyContent: "space-between", marginLeft: 10 },
  button: {
    marginHorizontal: 10,
    marginVertical: 20
  },
});


export const Home: React.FC<Props> = ({ navigation, gameStore }: Props) => {
  const [gameId, setGameId] = useState('');
  const joinExisitingGame = async (gameIdParam: string) => {
    await gameStore.joinGame(gameIdParam, uuid());
    if (!gameStore.error) navigation.navigate('Game');
  };
  const createAndJoinGame = async () => {
    await gameStore.createGame();
    await gameStore.joinGame(gameStore.id, uuid());
    if (!gameStore.error) navigation.navigate('Game');
  };

  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
      <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Form style={styles.form}>
          {/* <Item picker
          style={styles.picker}
          >
            < Label>Logo</Label>
            <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}>
                <Picker.Item label="label1" value="value1" />
                <Picker.Item label="label2" value="value2" />
            </Picker>
          </Item> */}
          <Item floatingLabel>
            <Label>Username</Label>
            <Input
              data-testid="userId-Input"
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
        <Button block dark
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
