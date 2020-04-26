import React, { useEffect } from 'react';
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
  Card as CardComponent,
  CardItem,
  Footer,
  FooterTab,
} from 'native-base';
import { observer } from 'mobx-react';
import { StyleSheet, Image, View, Share, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import useStores from '../utils/useStores';
import GameStore from '../stores/game';
import GameStatus from '../types/GameStatus';
import RoundStatus from '../types/RoundStatus';
import { Player } from '../types/Player';
import PlayerStatus from '../types/PlayerStatus';
import Card from '../types/Card';
import { Game as GameType } from '../types/Game';
import { AdMobBanner } from 'expo-ads-admob';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  gameStore: GameStore;
}

const Rules = [
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.NotStarted && player.card === Card.Healthy,
    header: 'Healthy (initial)',
    icon: 'ios-contacts',
    body:
      'Congrats!!! you are a healthy person. Your objective is to know who is infected but does not have simptoms, They know who they are!. You need to put them in quarentain before they infect you and send you directly to quarentain',
  },
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.NotStarted && player.card === Card.Infected,
    header: 'Infected (initial)',
    icon: 'bug',
    body:
      'oh Damm!!! you are infected, but you dont have any simptoms. Your objective is to get till the end without being quarentained. And also make sure everyone gets infected so you are not alone in your inmunity',
  },
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.Started &&
      game.round === RoundStatus.Separated &&
      player.card === Card.Healthy &&
      player.status === PlayerStatus.Free,
    header: 'Healthy (Separated)',
    icon: 'ios-contacts',
    body:
      'It is time to chat with everyone, and try to know who is infected. You will be able to vote just one person, when everyone has been voted that person will be quarentained. Would it be a Healthy or quarentained person?!',
  },
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.Started &&
      game.round === RoundStatus.Separated &&
      player.card === Card.Infected &&
      player.status === PlayerStatus.Free,
    header: 'Infected (Separated)',
    icon: 'bug',
    body:
      'It is time to chat with everyone, and try to disguise yourself as a healthy person. You will be able to vote just one person, when everyone has been voted that person will be quarentained.',
  },
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.Started &&
      game.round === RoundStatus.Join &&
      player.card === Card.Healthy &&
      player.status === PlayerStatus.Free,
    header: 'Healthy (Join)',
    icon: 'ios-contacts',
    body:
      'close your eyes...at this point you are cheating. That is definetly not cool!',
  },
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.Started &&
      player.card === Card.Infected &&
      player.status === PlayerStatus.Free,
    header: 'Infected (Join)',
    icon: 'bug',
    body:
      'is time to infect someone while you are all in the room together, just make sure you are in sync with the other infected. The healthy person with more votes will be infected and have simptoms getting them directly into quarentain.',
  },
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.Started &&
      player.card === Card.Healthy &&
      player.status === PlayerStatus.Quarentained,
    header: 'Healthy (Quarentained)',
    icon: 'ios-contacts',
    body:
      'You are done for this game...you can see what will happen, just dont spoil it for the rest ;)',
  },
  {
    applies: (game: GameType, player: Player) =>
      game.status === GameStatus.Started &&
      player.card === Card.Infected &&
      player.status === PlayerStatus.Quarentained,
    header: 'Infected (Quarentained)',
    icon: 'bug',
    body:
      'You are done for this game...you can see what will happen, just dont spoil it for the rest ;)',
  },
  {
    applies: (game: GameType, player: Player) => true,
    header: 'WOT',
    icon: 'bug',
    body: 'Should not be here',
  },
];

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginLeft: 10,
    marginRight: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  rules: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 130,
    marginHorizontal: 20,
  },
});

const right = (
  player: Player,
  currentPlayer: Player,
  game: GameType,
  action: (from: string, to: string) => Promise<void>
): JSX.Element => {
  if (
    currentPlayer.status === PlayerStatus.Quarentained ||
    game.status !== GameStatus.Started
  )
    return;
  if (game.round === RoundStatus.Separated)
    /* eslint-disable-next-line consistent-return */
    return (
      <Right>
        <Button
          transparent
          onPress={() => action(currentPlayer.name, player.name)}
        >
          <Text>Vote</Text>
        </Button>
      </Right>
    );
  if (
    game.round === RoundStatus.Join &&
    player.card !== Card.Infected &&
    currentPlayer.card === Card.Infected
  )
    /* eslint-disable-next-line consistent-return */
    return (
      <Right>
        <Button
          transparent
          onPress={() => action(currentPlayer.name, player.name)}
        >
          <Text>Vote</Text>
        </Button>
      </Right>
    );
};

const InQuarentainState = (players: Player[]): JSX.Element => {
  const quarantained = players.filter(
    (player) => player.status === PlayerStatus.Quarentained
  );
  if (quarantained.length === 0) return;
  const list = quarantained.map((player) => (
    <ListItem key={`players-list-item-${player.name}`} icon>
      <Left>
        <Icon
          style={{ fontSize: 30 }}
          name={player.card === Card.Infected ? 'bug' : 'ios-contacts'}
        />
      </Left>
      <Body>
        <Text>{player.name}</Text>
      </Body>
    </ListItem>
  ));
  /* eslint-disable-next-line consistent-return */
  return (
    <>
      <ListItem itemDivider>
        <Text>Quarentained</Text>
      </ListItem>
      {list}
    </>
  );
};

const InFreeState = (
  players: Player[],
  currentPlayer: Player,
  game: GameType,
  action: (from: string, to: string) => Promise<void>
): JSX.Element => {
  const list = players
    .filter((player) => player.status === PlayerStatus.Free)
    .map((player) => (
      <ListItem key={`players-list-item-${player.name}`} icon>
        <Left>
          <Icon style={{ fontSize: 30 }} name="help-circle-outline" />
        </Left>
        <Body>
          <Text>{player.name}</Text>
        </Body>
        {right(player, currentPlayer, game, action)}
      </ListItem>
    ));
  return (
    <>
      <ListItem itemDivider>
        <Text>Free</Text>
      </ListItem>
      {list}
    </>
  );
};

export const Game: React.FC<Props> = ({ gameStore }: Props) => {
  useEffect(() => {
    gameStore.startRefresh();
    return () => {
      gameStore.stopRefresh();
    };
  }, [gameStore]);
  const { game, userId } = gameStore;
  const otherPlayers = game.players.filter((player) => player.name !== userId);
  const currentPlayer = game.players.filter(
    (player) => player.name === userId
  )[0];
  const rule = Rules.find((currentRule) =>
    currentRule.applies(game, currentPlayer)
  );
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        <ScrollView>
          <Image
            /* eslint-disable-next-line global-require */
            source={require('../../assets/icon.png')}
            style={styles.logo}
          />
          <View style={styles.buttonContainer}>
            {game.status === GameStatus.NotStarted && (
              <Button
                bordered
                style={styles.button}
                onPress={
                  () =>
                    Share.share({
                      message: `Join the infecteed game created with: ${game.id}`,
                    }) /* eslint-disable-same-line prettier/prettier */
                }
              >
                <Icon name="people" />
                <Text>Invite</Text>
              </Button>
            )}
            {game.status === GameStatus.NotStarted && otherPlayers.length > 1 && (
              <Button style={styles.button} onPress={gameStore.start}>
                <Icon name="play" />
                <Text>Start</Text>
              </Button>
            )}
          </View>
          <CardComponent style={styles.rules}>
            <CardItem header>
              <Icon name={rule.icon} />
              <Text>{rule.header}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>{rule.body}</Text>
              </Body>
            </CardItem>
          </CardComponent>
          <List>
            {InFreeState(otherPlayers, currentPlayer, game, gameStore.vote)}
            {InQuarentainState(otherPlayers)}
          </List>
        </ScrollView>
      </Content>
      <Footer>
          <FooterTab>
            <AdMobBanner
              adUnitID="ca-app-pub-1195732568094557/5351150714"
              servePersonalizedAds={false}
              onDidFailToReceiveAdWithError={console.log} />
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default observer((props) =>
  Game({ gameStore: useStores().gameStore, ...props })
);
