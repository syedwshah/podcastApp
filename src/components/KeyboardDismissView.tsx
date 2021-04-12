import React from 'react';
import {Keyboard, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

interface Props {
  withScrollView?: boolean;
}

const KeyboardDismissView: React.FC<Props> = props => {
  if (props.withScrollView) {
    return (
      <ScrollView
        keyboardShouldPersistTaps="never"
        contentContainerStyle={styles.container}>
        {props.children}
      </ScrollView>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={styles.container}>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardDismissView;
