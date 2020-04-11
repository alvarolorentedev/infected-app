import StorybookUI from '.';

export default () => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
      (async () => {
        try {
          /* eslint-disable global-require, @typescript-eslint/camelcase */
          await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
          });
          /* eslint-enable global-require, @typescript-eslint/camelcase */
        } catch (error) {
          /* eslint-disable-next-line no-console */
          console.log(error);
        }
        setReady(true);
      })();
    }, []);
    return (
      ready && StorybookUI
    );
  };