/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import {Box, Text} from 'react-native-design-utility';
import {theme} from '../../constants/theme';
import {makeHitSlop} from '../../constants/metrics';
import RNTrackPlayer from 'react-native-track-player';
import {usePlayerContext} from '../../contexts/PlayerContext';

const QueueScreen = () => {
  const [queue, setQueue] = React.useState<RNTrackPlayer.Track[]>([]);
  const playerContext = usePlayerContext();

  const navigation = useNavigation();

  const getQueue = async () => {
    const tracks = await RNTrackPlayer.getQueue();

    setQueue(tracks);
  };

  useFocusEffect(
    React.useCallback(() => {
      getQueue();
    }, []),
  );

  return (
    <SafeAreaView style={s.safeArea}>
      <Box px="md" dir="row" align="center" justify="between" mb="lg">
        <Box f={1}>
          <TouchableOpacity
            onPress={navigation.goBack}
            hitSlop={makeHitSlop(20)}>
            <Text>Done</Text>
          </TouchableOpacity>
        </Box>

        <Box f={1} align="center">
          <Text bold>Up Next</Text>
        </Box>
        <Box f={1} />
      </Box>

      <ScrollView>
        {queue.map(track => (
          <TouchableOpacity
            key={track.id}
            onPress={async () => {
              await playerContext.play(track);
              navigation.goBack();
            }}>
            <Box h={90} px="md" dir="row">
              <Box h={70} w={70} radius={10} bg="blue" mr="sm">
                {track.artwork && (
                  <Image
                    source={{uri: track.artwork}}
                    style={{
                      height: 70,
                      width: 70,
                      borderRadius: 10,
                    }}
                  />
                )}
              </Box>
              <Box f={1}>
                <Text bold numberOfLines={1}>
                  {track.title}
                </Text>
                <Text size="sm" color="grey">
                  {track.artist}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.color.white,
  },
});

export default QueueScreen;
