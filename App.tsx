import 'react-native-gesture-handler';
import React from 'react';
import {UtilityThemeProvider} from 'react-native-design-utility';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client/react';
import TrackPlayer from 'react-native-track-player';

import {theme} from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import {client} from './src/graphql/client';
import trackPlayerServices from './src/services/trackplayerServices';

const track = {
  id: 1,
  url: 'https://media.transistor.fm/39765eda/0e219b35.mp3',
  title:
    '152: Ben Orenstein - How to Stand Out When Applying for a Job at a Small Company',
  artist: 'Full Stack Radio',
};

const App = () => {
  React.useEffect(() => {
    (async () => {
      await TrackPlayer.setupPlayer().then(() => {
        console.log('player is set up');
      });

      TrackPlayer.registerPlaybackService(() => trackPlayerServices);

      await TrackPlayer.add([track]);

      await TrackPlayer.play();

      setTimeout(() => {
        TrackPlayer.stop();
      }, 2000);
    })();
  }, []);
  return (
    <UtilityThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </UtilityThemeProvider>
  );
};

export default App;
