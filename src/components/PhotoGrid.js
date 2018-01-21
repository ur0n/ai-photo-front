import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import { TouchablePhoto } from './TouchablePhoto';

const styles = StyleSheet.create({
  photoGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export const PhotoGrid = props => {
  const { photos, onPress } = props;
  return (
    <ScrollView>
      <View style={styles.photoGrid}>
        { photos.map((photo, i) => <TouchablePhoto key={i} onPress={onPress} photo={photo} />) }
      </View>
    </ScrollView>
  );
}
