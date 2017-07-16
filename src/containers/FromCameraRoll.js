import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { getPhotosForCameraRoll } from '../actions/cameraRoll';

class FromCameraRoll extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getPhotos();
  }

  render(){
    const { photos, isFetched } = this.props.cameraRoll;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.photoGrid}>
            {
              isFetched? (
                photos.map((photo, i) => {
                  return <Image key={i} style={styles.photo} source={{uri: photo.uri}} />
                })
              ) : null
            }
          </View>
        </ScrollView>
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
  linkText: {
    fontSize: 32,
    color: 'rgb(95, 177, 237)',
  },
  text: {
    textAlign: 'center'
  },
  photo: {
    width: 116,
    height: 116,
    margin: 1
  },
  photoGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});

function mapStateToProps(state){
  return {
    cameraRoll: state.cameraRoll
  }
}

function mapDispatchToProps(dispatch){
  return {
    getPhotos: () => dispatch(getPhotosForCameraRoll())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FromCameraRoll);
