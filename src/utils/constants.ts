import ExpoConstants from 'expo-constants';

const constants = __DEV__
  ? ExpoConstants.manifest.extra.dev
  : ExpoConstants.manifest.extra.prod;

export default constants;
