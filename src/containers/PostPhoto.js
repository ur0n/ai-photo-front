import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { storePhotoToServer } from '../actions/postPhoto';


class PostPhoto extends Component {
  constructor(props){
    super(props);
  }

  postPhoto(){
    const selectPhoto = this.props.isCameraRoll? this.props.cameraRoll.selectPhoto: this.props.camera.photo;
    this.props.postPhoto(selectPhoto);

    Actions.pop();
  }

  render(){
    const { photo } = this.props.camera;
    console.log(photo);
    const { selectPhoto } = this.props.cameraRoll;
    //navigater params
    const isCameraRoll = this.props.isCameraRoll;

    return(
      <View style={styles.container}>
        <View style={styles.contents}>
          {isCameraRoll &&
            <Image key={"first"} style={styles.bigPhoto} source={{uri: selectPhoto.uri}} />
          }

          {!isCameraRoll && photo !== null &&
            <Image key={"first"} style={styles.bigPhoto} source={{uri: photo.uri}} />
          }
        </View>
        <TouchableHighlight style={styles.button} onPress={this.postPhoto.bind(this)}>
          <Text style={styles.buttonText}>Post Photo!</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contents: {
    flex: 5,
    alignItems: 'stretch',
    paddingTop: 65
  },
  bigPhoto: {
    flex: 1,
    margin: 10
  },
  button: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  }
});

function mapStateToProps(state){
  return {
    cameraRoll: state.cameraRoll,
    camera: state.camera
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
