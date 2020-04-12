import { getStorybookUI, configure } from '@storybook/react-native';
import { AsyncStorage } from 'react-native';
import { registerRootComponent } from 'expo';

import './rn-addons';

configure(() => {
  require('./stories');
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: AsyncStorage
});

registerRootComponent(StorybookUIRoot);
export default StorybookUIRoot;
