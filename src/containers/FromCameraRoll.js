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
        <View>
        {
          isFetched? (
            <Image key={"first"} style={styles.bigPhoto} source={{uri: selectPhoto.uri}} />
          ) : null
        }
      </View>
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
