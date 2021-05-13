import React from 'react';
import HTML from 'react-native-render-html';

import {theme} from '../constants/theme';

interface Props {
  html: string;
}

const HtmlReader = (props: Props) => {
  return (
    <HTML
      source={{html: props.html}}
      tagsStyles={{
        a: {color: theme.color.blueLight, fontWeight: 'bold'},
      }}
    />
  );
};

export default HtmlReader;
