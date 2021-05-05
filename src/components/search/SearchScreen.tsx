import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {FlatList, StyleSheet, TextInput} from 'react-native';
import {useLazyQuery} from '@apollo/client';
import Icon from 'react-native-vector-icons/Feather';

import {theme} from '../../constants/theme';
import {
  SearchQuery,
  SearchQuery_search,
  SearchQueryVariables,
} from '../../types/graphql';
import searchQuery from '../../graphql/query/searchQuery';
import SearchEmpty from './SearchEmpty';
import SearchTile from './SearchTile';
import SearchLoading from './SearchLoading';

const SearchScreen = () => {
  const [term, setTerm] = React.useState<string>('');
  const [search, {data, loading, error}] = useLazyQuery<
    SearchQuery,
    SearchQueryVariables
  >(searchQuery);

  const onSearch = async () => {
    try {
      await search({variables: {term}});
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <Box f={1} bg="white">
      <Box h={50} w="100%" px="sm" my="sm">
        <Box
          dir="row"
          align="center"
          h={40}
          bg="greyLightest"
          radius={10}
          px="sm">
          <Box mr={10}>
            <Icon name="search" size={20} color={theme.color.greyDark} />
          </Box>
          <TextInput
            style={styles.input}
            placeholder="Search Podcast"
            placeholderTextColor={theme.color.grey}
            selectionColor={theme.color.blueLight}
            onChangeText={setTerm}
            autoCorrect={false}
            onSubmitEditing={onSearch}
            value={term}
          />
        </Box>
      </Box>

      {error ? (
        <Box f={1} center>
          <Text color="red">{error.message}</Text>
        </Box>
      ) : (
        <FlatList<SearchQuery_search>
          keyboardShouldPersistTaps="never"
          contentContainerStyle={styles.listContentContainer}
          data={data?.search ?? []}
          ListHeaderComponent={<>{loading && <SearchLoading />}</>}
          ListEmptyComponent={<>{!loading && <SearchEmpty />}</>}
          renderItem={({item}) => <SearchTile item={item} />}
          keyExtractor={item =>
            String(
              `${item.feedUrl}${item.podcastName}${item.thumbnail}${item.episodesCount}`,
            )
          }
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontSize: theme.text.size.md,
  },
  listContentContainer: {
    paddingBottom: 90,
  },
});

export default SearchScreen;
