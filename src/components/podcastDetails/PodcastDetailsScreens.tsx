import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import {useQuery} from '@apollo/client';

import {SearchStackRouteParamsList} from '../../navigators/types';
import {theme} from '../../constants/theme';
import {FeedQuery, FeedQueryVariables} from '../../types/graphql';
import feedQuery from '../../graphql/query/feedQuery';
import {getWeekDay, humanDuration} from '../../lib/dateTimeHelpers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {usePlayerContext} from '../../contexts/PlayerContext';
import {DBContext} from '../../contexts/DBContext';
import {PodcastModel} from '../../models/PodcastModel';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const playerContext = usePlayerContext();
  const dbContext = React.useContext(DBContext);
  const navigation = useNavigation();
  const {data: podcastData} = useRoute<NavigationParams>()?.params ?? {};

  const {data, loading} = useQuery<FeedQuery, FeedQueryVariables>(feedQuery, {
    variables: {
      feedUrl: podcastData.feedUrl,
    },
  });
  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {podcastData.thumbnail && (
                <Box mr={10}>
                  <Image
                    source={{uri: podcastData.thumbnail}}
                    style={styles.thumbnail}
                  />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold>
                  {podcastData.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {podcastData.artist}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    dbContext.subToPodcast(
                      new PodcastModel({
                        episodesCount: podcastData.episodesCount,
                        thumbnail: podcastData.thumbnail,
                        name: podcastData.podcastName,
                        artist: podcastData.artist,
                        feedUrl: podcastData.feedUrl,
                      }),
                    )
                  }>
                  <Text color="blueLight" size="xs">
                    Subscribed
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
            <Box px="xs" mb="md" dir="row" align="center">
              <Box mr={10}>
                <TouchableOpacity
                  onPress={() => {
                    const el = data?.feed[0];

                    if (!el) {
                      return;
                    }
                    playerContext.play({
                      title: el.title,
                      artwork: el.image ?? podcastData.thumbnail,
                      id: el.linkUrl,
                      url: el.linkUrl,
                      artist: podcastData.artist,
                    });
                  }}>
                  <Icon name="play" size={30} color={theme.color.blueLight} />
                </TouchableOpacity>
              </Box>
              <Box f={1}>
                <Text bold>Play</Text>
                <Text size="sm">{data?.feed[0].title}</Text>
              </Box>
            </Box>

            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>

            {loading && (
              <Box h={200} center>
                <ActivityIndicator size="large" color={theme.color.blueLight} />
              </Box>
            )}
          </>
        }
        data={data?.feed}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box bg="greyLighter" style={{height: StyleSheet.hairlineWidth}} />
          </Box>
        )}
        renderItem={({item}) => (
          <Box px="xs">
            <Text size="xs" color="grey">
              {getWeekDay(new Date(item.pubDate)).toUpperCase()}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EpisodeDetails', {
                  episode: item,
                  podcast: podcastData,
                });
              }}>
              <Text bold>{item.title}</Text>
            </TouchableOpacity>
            <Text size="sm" color="grey" numberOfLines={2}>
              {item.summary
                .replace(/<[^>]*>/g, ' ')
                .replace(/\s{2,}/g, ' ')
                .trim()}
            </Text>
            <Text size="sm" color="grey">
              {humanDuration(item.duration)}
            </Text>
          </Box>
        )}
        keyExtractor={item => item.linkUrl}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
});

export default PodcastDetailsScreen;
