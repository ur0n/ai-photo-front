import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';
import { fetchPhotosFromAPI } from '../actions/photoList';

class PhotoList extends Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.getPhotoList();
  }

  render(){
    const { isFetched, photoList } = this.props.photoList;

    return (
      <View style={styles.container}>
        <View style={styles.contents}>
          <ScrollView>
            <View style={styles.photoContainer}>
              {
                isFetched? photoList.Photos.map((photo, i) => {
                  const ps = photo.image.String;
                  if(ps.substring(ps.length - 3, ps.length) === "jpg"){
                    return <Image key={i} style={styles.photo} source={{uri: "https://b.sakurastorage.jp/ai-photo/images/" + photo.image.String}} />
                  }else{
                    return null;
                  }
                }) : null
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
    marginTop: 65,
    marginBottom: 50
  },
  contents: {
    flex: 1
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },
  photo: {
    height: 300,
    width: 300,
    margin: 1,
    borderRadius: 10,
    backgroundColor: '#aff',
  }
});

function mapStateToProps (state) {
  return {
    photoList: state.photoList
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getPhotoList: () => dispatch(fetchPhotosFromAPI())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoList);
