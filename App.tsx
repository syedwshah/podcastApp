import 'react-native-gesture-handler';
import React from 'react';
import {Box, UtilityThemeProvider} from 'react-native-design-utility';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client/react';
import TrackPlayer from 'react-native-track-player';

import {theme} from './src/constants/theme';
import MainStackNavigator from './src/navigators/MainStackNavigator';
import {client} from './src/graphql/client';

import {ActivityIndicator} from 'react-native';
import {PlayerContextProvider} from './src/contexts/PlayerContext';
import {DBProvider} from './src/contexts/DBContext';

/*Sample of what data may look like: */
// const track = {
//   id: 1,
//   url: 'https://media.transistor.fm/39765eda/0e219b35.mp3',
//   title:
//     '152: Ben Orenstein - How to Stand Out When Applying for a Job at a Small Company',
//   artist: 'Full Stack Radio',
// };

const App = () => {
  const [isReady, setIsReady] = React.useState<boolean>(false);

  React.useEffect(() => {
    TrackPlayer.setupPlayer({
      waitForBuffer: true,
    }).then(() => {
      console.log('player is set up');

      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_JUMP_FORWARD,
          TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        ],
        jumpInterval: 30,
      });

      setIsReady(true);
    });
  }, []);
  return (
    <UtilityThemeProvider theme={theme}>
      <DBProvider>
        <ApolloProvider client={client}>
          {isReady ? (
            <PlayerContextProvider>
              <NavigationContainer>
                <MainStackNavigator />
              </NavigationContainer>
            </PlayerContextProvider>
          ) : (
            <Box f={1} center>
              <ActivityIndicator />
            </Box>
          )}
        </ApolloProvider>
      </DBProvider>
    </UtilityThemeProvider>
  );
};

export default App;
