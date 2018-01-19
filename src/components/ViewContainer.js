import React from 'react';
import { View } from 'react-native';

const styles = {
  container: {
    flex: 1,
  }
}

export const ViewContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);
