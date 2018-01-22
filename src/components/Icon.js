import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { colors, images } from '../config';

const styles = StyleSheet.create({
  active: {
    width: 35,
    height: 35,
    backgroundColor: colors.white,
  },
  inactive: {
    width: 35,
    height: 35,
    backgroundColor: colors.white,
  },
});

const inactiveIcon = image => image + '_inactive';

const Icon = props => {
  const { iconImage, selected } = props;
  const icon = selected? iconImage : inactiveIcon(iconImage);

  return (
    <View>
      <Image
        style={
          !props.selected ?
          styles.inactive :
          styles.active
        }
      resizeMode='stretch'
      source={images[icon]}
      />
    </View>
  );
}

export default Icon;
