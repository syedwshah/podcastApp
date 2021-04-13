import React from 'react';
import {Box, Text} from 'react-native-design-utility';
import {FlatList, StyleSheet, TextInput} from 'react-native';

import {theme} from '../../constants/theme';
import {useLazyQuery} from '@apollo/client';
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
          keyExtractor={item => String(item.feedUrl)}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    flex: 1,
    backgroundColor: theme.color.greyLightest,
    borderRadius: 10,
    paddingHorizontal: theme.space.sm,
    fontSize: theme.text.size.md,
  },
  listContentContainer: {
    paddingBottom: 90,
  },
});

export default SearchScreen;
