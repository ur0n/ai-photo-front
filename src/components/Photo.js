import React from 'react';
import { Image } from 'react-native';

export const Photo = props => (
  <Image source={{uri: "https://s3-ap-northeast-1.amazonaws.com/shop-bot-view/" + props.fileName}} style={props.style} />
);
