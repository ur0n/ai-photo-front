import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { colors } from '../config';

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

const Icon = props => {
  return (
    <View>
      <Image
        style={
          !props.selected ?
          styles.inactive :
          styles.active
        }
      resizeMode='stretch'
      source={props.iconImage}
      />
    </View>
  );
}

export default Icon;
