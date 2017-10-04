import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { colors } from '../config';

const styles = StyleSheet.create({
  tabText: {
    color: colors.lightGray,
  },
  tabTextActive: {
    fontWeight: 'bold',
    color: colors.mintGreen,
  },
});

const TabIcon = props => {
  console.log(props.selected);
  return (
    <Text
      style={
        !props.selected ?
        styles.tabText :
        styles.tabTextActive
      }
      >
      {props.title}
    </Text>
  );
}

export default TabIcon;
