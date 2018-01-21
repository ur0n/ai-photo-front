import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native';


const styles = StyleSheet.create({
  photo: {
    flex: 1,
    margin: 1,
    width: getPhotoSize(),
    height: getPhotoSize(),
  }
});

function getPhotoSize(){
  return Dimensions.get('window').width / 4 - 2;
}

export const TouchablePhoto = props => {
  return (
    <TouchableHighlight key={props.key} onPress={() => props.onPress(props.photo)}>
      <Image key={props.key} style={styles.photo} source={{uri: props.photo.image.uri}} />
    </TouchableHighlight>
  );
}
