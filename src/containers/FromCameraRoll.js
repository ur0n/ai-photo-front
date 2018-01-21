import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { getPhotosForCameraRoll, selectUploadPhoto } from '../actions/cameraRoll';
import { ViewContainer, PhotoGrid, TouchablePhoto } from '../components';

const styles = StyleSheet.create({
  selected: {
    flex: 2,
  },
  selectedPhoto: {
    flex: 1,
    alignItems: 'stretch'
  },
  photoGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cameraRoll: {
    flex: 1,
  }
});

const mapStateToProps = state => {
  return {
    cameraRoll: state.cameraRoll
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getPhotos: () => dispatch(getPhotosForCameraRoll()),
    selectPhoto: photo => dispatch(selectUploadPhoto(photo))
  };
}

//TODO 画像のトリミング
class FromCameraRoll extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getPhotos();
  }

  render(){
    const { photos, selectedPhoto, isFetched, selectPhoto } = this.props.cameraRoll;
    return (
      <ViewContainer>
        <View style={styles.selected}>
          {isFetched
              &&
              <Image
                key={"first"}
                style={styles.selectedPhoto}
                source={{uri: selectedPhoto.image.uri}}
              />
          }
          {!isFetched
              &&
              // lodingのview
              null
          }
        </View>
        <View style={styles.cameraRoll}>
          <PhotoGrid photos={photos} onPress={this.props.selectPhoto} />
        </View>
      </ViewContainer>
    );
  }
}

export const FromCameraRollScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(FromCameraRoll);
