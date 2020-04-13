import React from 'react';
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Icon,
  Button,
  H1,
} from 'native-base';
import { observer } from 'mobx-react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import useStores from '../utils/useStores';
import GameStore from '../stores/game';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  gameStore: GameStore;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
});

export const Game: React.FC<Props> = ({ navigation, gameStore }: Props) => {
  const { game } = gameStore;
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
      <H1>Game</H1>
        <Text>
          {game.id}
        </Text>
        <List>
          {game.players.map((player, index) => (
            <ListItem key={`players-list-item-${index}`} icon>
              <Left>
                <Icon style={{ fontSize: 30 }} name="ios-contacts" />
              </Left>
              <Body>
                <Text>{player.name}</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>Vote</Text>
                </Button>
              </Right>
            </ListItem>
          ))}
        </List>
      </Content>
    </Container>
  );
};

export default observer((props) =>
  Game({ gameStore: useStores().gameStore, ...props })
);
