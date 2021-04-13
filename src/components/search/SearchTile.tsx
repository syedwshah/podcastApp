import React from 'react';
import {Image} from 'react-native';
import {Box, Text} from 'react-native-design-utility';
import {StyleSheet} from 'react-native';

import {SearchQuery_search} from '../../types/graphql';

interface Props {
  item: SearchQuery_search;
}

const SearchTile: React.FC<Props> = props => {
  const {item} = props;
  return (
    <Box h={90} dir="row" align="center" px="sm">
      <Box h={70} w={70} bg="blueLight" radius={10} mr={10}>
        {item.thumbnail && (
          <Image source={{uri: item.thumbnail}} style={styles.img} />
        )}
      </Box>
      <Box f={1}>
        <Text bold numberOfLines={1}>
          {item.podcastName}
        </Text>
        <Text size="xs" color="grey">
          {item.artist}
        </Text>
        <Text size="xs" color="blueLight">
          {item.episodesCount}
        </Text>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    borderRadius: 10,
  },
});
export default SearchTile;
