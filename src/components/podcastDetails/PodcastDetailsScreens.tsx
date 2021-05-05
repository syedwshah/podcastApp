import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../../constants/theme';

import {SearchStackRouteParamsList} from '../../navigators/types';

type NavigationParams = RouteProp<SearchStackRouteParamsList, 'PodcastDetails'>;

const PodcastDetailsScreen = () => {
  const {data} = useRoute<NavigationParams>()?.params ?? {};
  return (
    <Box f={1} bg="white">
      <FlatList
        ListHeaderComponent={
          <>
            <Box dir="row" px="sm" mt="sm" mb="md">
              {data.thumbnail && (
                <Box mr={10}>
                  <Image
                    source={{uri: data.thumbnail}}
                    style={styles.thumbnail}
                  />
                </Box>
              )}
              <Box f={1}>
                <Text size="lg" bold>
                  {data.podcastName}
                </Text>
                <Text size="xs" color="grey">
                  {data.artist}
                </Text>
                <Text color="blueLight" size="xs">
                  Subscribed
                </Text>
              </Box>
            </Box>
            <Box px="xs" mb="md" dir="row" align="center">
              <Box mr={10}>
                <Icon name="play" size={30} color={theme.color.blueLight} />
              </Box>
              <Box>
                <Text bold>Play</Text>
                <Text size="sm">#400 - The Last Episode</Text>
              </Box>
            </Box>

            <Box px="sm" mb="md">
              <Text bold size="lg">
                Episodes
              </Text>
            </Box>
          </>
        }
        data={[{id: '1'}, {id: '2'}]}
        ItemSeparatorComponent={() => (
          <Box w="100%" px="sm" my="sm">
            <Box bg="greyLighter" style={{height: StyleSheet.hairlineWidth}} />
          </Box>
        )}
        renderItem={() => (
          <Box px="xs">
            <Text size="xs" color="grey">
              FRIDAY
            </Text>
            <Text bold>#400 - The Title</Text>
            <Text size="sm" color="grey" numberOfLines={2}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptatem, temporibus consectetur iusto recusandae doloremque
              nulla quam, beatae, repellendus nobis voluptatibus numquam
              consequatur maiores tenetur delectus placeat animi aut
              reprehenderit fugit!
            </Text>
            <Text size="sm" color="grey">
              3hrs. 13min
            </Text>
          </Box>
        )}
        keyExtractor={item => item.id}
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
