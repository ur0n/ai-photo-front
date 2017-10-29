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

const CameraRollIcon = props => {
  console.log(props.selected);
  return (
    <View>
      <Image
        style={
          !props.selected ?
          styles.tabText :
          styles.tabTextActive
        }
        source={require('../../assets/line/s_camera.png')}
        />
    </View>
  );
}

export default CameraRollIcon;
