import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { storePhotoToServer } from '../actions/postPhoto';


const PostPhoto = props => {
  const selectPhoto = props.selectPhoto;
  return(
    <View style={styles.container}>
      <View>
        <Image key={"first"} style={styles.bigPhoto} source={{uri: selectPhoto.uri}} />
      </View>
      <TouchableHighlight style={styles.button} onPress={() => props.postPhoto(selectPhoto)}>
        <Text style={styles.buttonText}>Post Photo!</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingLeft: 10,
    paddingRight: 10
  },
  bigPhoto: {
    width: 353,
    height: 400,
    margin: 1
  },
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  },
  linkText: {
    fontSize: 32,
    color: 'rgb(95, 177, 237)',
  },
});

function mapStateToProps(state){
  return {
    selectPhoto: state.cameraRoll.selectPhoto
  }
}

function mapDispatchToProps(dispatch){
  return {
    postPhoto: photo => dispatch(storePhotoToServer(photo))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPhoto);
