import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { colors } from '../config';

const styles = StyleSheet.create({
  tabText: {
    backgroundColor: colors.white,
  },
  tabTextActive: {
    backgroundColor: colors.white,
  },
});

const Icon = props => {
  return (
    <View>
      <Image
        style={
          !props.selected ?
          styles.tabText :
          styles.tabTextActive
        }
        source={props.iconImage}/>
    </View>
  );
}

export default Icon;
