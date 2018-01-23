import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    Picker,
    Modal,
    Button,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    ScrollView,
    NativeModules,
    Dimensions,
    Animated,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'

import {
  ViewContainer,
  EraForm,
  TitleForm,
  SeasonSelect,
} from '../components';
import { storePhotoToServer } from '../actions/postPhoto';
import { colors, images } from '../config';

const styles = StyleSheet.create({
  contents: {
    flex: 3,
    flexDirection: 'row',
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
  },
  photoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    height: 100,
    width: 100,
  },
  mapInfo: {
    flex: 2,
    borderBottomColor: colors.lightBlack,
    borderBottomWidth: 1,
  },
  blank: {
    flex: 5
  },
});

const mapStateToProps = state => {
  return {
    cameraRoll: state.cameraRoll,
    camera: state.camera
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postPhoto: body => dispatch(storePhotoToServer(body))
  }
}

const getDateString = time => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`
}

const MapInfo = props => {
  return (
    <View style={styles.mapInfo}></View>
  );
}

class PostPhoto extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      era: '選択してください',
      season: 'spring',
    };
  }

  componentWillMount(){
    // TODO cameraとcamerarollで同じデータを変更する
    const { photo } = this.props.camera;
    const { selectedPhoto } = this.props.cameraRoll;

    //navigater params
    const isCameraRoll = this.props.isCameraRoll;


    // 苦肉の作。。。
    if(isCameraRoll) {
      return new Promise((resolve, reject) => {
        NativeModules.RNImageToBase64.getBase64String(selectedPhoto.image.uri, (err, base64) => {
          resolve(base64);
          if(err){
            reject(err)
          }
        })
      }).then(base64 => {
        const uploadPhoto = selectedPhoto;
        uploadPhoto.image = base64;
        console.log("[LOG]", uploadPhoto);
        const { location, timestamp, image } = uploadPhoto;
        const dateString = getDateString(timestamp);

        this.setState(state => {
          return {...state, location, date: dateString, photo: image, timestamp}
        })
      })
    }else {
      // const uploadPhoto = isCameraRoll? selectedPhoto : photo
      const uploadPhoto = photo
      console.log("[LOG]", uploadPhoto);
      const { location, timestamp, image } = uploadPhoto;
      const dateString = getDateString(timestamp);

      this.setState(state => {
        return {...state, location, date: dateString, photo: image, timestamp}
      })
    }
  }

  postPhoto(){
    const { title, timestamp, photo, location } = this.state;
    const body = { title, timestamp, photo, location };
    this.props.postPhoto(body);

    Actions.pop();
  }

  _onTitleChangeHandler(title){
    this.setState({title})
  }

  _onEraChangeHdndler(era){
    this.setState({era});
  }

  _onSelectSeasonHandler(season){
    this.setState({season});
  }

  render(){
    const { photo } = this.state;
    console.log(this.state);
    return(
      <ViewContainer hideTabBar>
        <View style={styles.contents}>
          <View style={styles.photoContainer}>
            {photo
              &&
              <Image key={"first"} style={styles.photo} source={{uri: "data:image/jpeg;base64," + photo}} />
            }
            {!photo
              &&
              null
            }
          </View>
          <TitleForm titleChangeHandler={title => this._onTitleChangeHandler(title)} />
        </View>
        <EraForm eraChangeHandler={era => this._onEraChangeHdndler(era)} />
        <SeasonSelect selectSeasonHandler={season => this._onSelectSeasonHandler(season)} />
        <MapInfo />
        <View style={styles.blank}>
        </View>
      </ViewContainer>
    );
  }
}

export const PostPhotoScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPhoto);
