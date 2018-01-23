import React from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import { colors, images } from '../config';

const styles = StyleSheet.create({
  seasonSelect: {
    flex: 2,
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
    flexDirection: 'column',
  },
  seasonButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formKey: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formText: {
    alignSelf: 'flex-start',
  },
  selectContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 44,
    height: 44,
  }
});

const SeasonButton = props => {
  return (
    <View style={styles.seasonButtonContainer}>
      <TouchableHighlight
        style={styles.imageOuter}
        onPress={() => props.selectSeasonHandler(props.season)}
        underlayColor={colors.lightGray}
      >
        <Image
          style={styles.buttonImage}
          source={images[props.season]}
          resizeMode='contain'
        />
      </TouchableHighlight>
    </View>
  );
}

export const SeasonSelect = props => {
  return (
    <View style={styles.seasonSelect}>
      <View style={styles.formKey}>
        <Text style={styles.formText}> 季節 </Text>
      </View>
      <View style={styles.selectContainer}>
        <SeasonButton
          season='spring'
          selectSeasonHandler={props.selectSeasonHandler}
        />
        <SeasonButton
          season='summer'
          selectSeasonHandler={props.selectSeasonHandler}
        />
        <SeasonButton
          season='autumn'
          selectSeasonHandler={props.selectSeasonHandler}
        />
        <SeasonButton
          season='winter'
          selectSeasonHandler={props.selectSeasonHandler}
        />
      </View>
    </View>
  );
}
