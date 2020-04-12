import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function NativeBaseWrapper({ children }) {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
      (async () => {
        try {
          /* eslint-disable global-require, @typescript-eslint/camelcase */
          await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.Font,
          });
          /* eslint-enable global-require, @typescript-eslint/camelcase */
          setReady(true);
        } catch (error) {
          /* eslint-disable-next-line no-console */
          setError(error);
        }
      })();
    }, []);
    return ready && children

  };