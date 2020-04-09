import React, { useEffect } from 'react';
import { Container, Content, Text } from 'native-base';
import { observer } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import useStores from '../utils/useStores';

type RootStackParamList = {
  Home: undefined;
  Game: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const Game: React.FC<Props> = () => {
  const { gameStore } = useStores();
  useEffect(() => {
    // Your code here
  }, []);
  return (
    <Container>
      <Content>
        <Text>Game Window</Text>
      </Content>
    </Container>
  );
};

export default observer(Game);
