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

//TODO 画像のトリミング
class FromCameraRoll extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getPhotos();
  }

  render(){
    const { photos, selectPhoto, isFetched } = this.props.cameraRoll;
    return (
      <View style={styles.container}>
        <View style={styles.selected}>
          {
            isFetched? (
              <Image key={"first"} style={styles.selectedPhoto} source={{uri: selectPhoto.uri}} />
            ) : null
          }
        </View>
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.photoGrid}>
              {
                isFetched? (
                  photos.map((photo, i) => {
                    return (
                      <TouchableHighlight key={i} onPress={() => this.props.selectPhoto(photo)}>
                        <Image key={i} style={styles.photo} source={{uri: photo.uri}} />
                      </TouchableHighlight>
                    );
                  })
                ) : null
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
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

function mapStateToProps(state){
  return {
    cameraRoll: state.cameraRoll
  };
}

function mapDispatchToProps(dispatch){
  return {
    getPhotos: () => dispatch(getPhotosForCameraRoll()),
    selectPhoto: photo => dispatch(selectUploadPhoto(photo))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FromCameraRoll);
