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
        {isCameraRoll &&
          <View>
            <Image key={"first"} style={styles.bigPhoto} source={{uri: selectPhoto.uri}} />
          </View>
        }

        {!isCameraRoll && photo !== null &&
          <View>
            <Image key={"first"} style={styles.bigPhoto} source={{uri: photo.uri}} />
          </View>
        }

        <TouchableHighlight style={styles.button} onPress={this.postPhoto.bind(this)}>
          <Text style={styles.buttonText}>Post Photo!</Text>
        </TouchableHighlight>
      </View>
    );
  }
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
