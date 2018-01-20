import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    ScrollView,
    NativeModules,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker'

import { ViewContainer } from '../components';
import { storePhotoToServer } from '../actions/postPhoto';
import { colors } from '../config';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contents: {
    flex: 5,
    alignItems: 'stretch',
  },
  bigPhoto: {
    flex: 1,
    margin: 10
  },
  form: {
    flex: 1
  },
  formRow: {
    height: 40,
    borderWidth: 1,
    flexDirection: "row",
  },
  formKey: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: colors.mintGreen
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
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


class PostPhoto extends Component {
  constructor(props){
    super(props);
    this.state = { title: 'test', date: "2016-05-15" };
  }

  componentWillMount(){
    // TODO cameraとcamerarollで同じデータを変更する
    const { photo } = this.props.camera;
    const { selectPhoto } = this.props.cameraRoll;

    //navigater params
    const isCameraRoll = this.props.isCameraRoll;

    // 苦肉の作。。。
    if(isCameraRoll) {
      return new Promise((resolve, reject) => {
        NativeModules.RNImageToBase64.getBase64String(selectPhoto.image.uri, (err, base64) => {
          resolve(base64);
          if(err){
            reject(err)
          }
        })
      }).then(base64 => {
      const uploadPhoto = selectPhoto;
      uploadPhoto.image = base64;
      console.log("[LOG]", uploadPhoto);
      const { location, timestamp, image } = uploadPhoto;
      const dateString = getDateString(timestamp);

      this.setState(state => {
        return {...state, location, date: dateString, photo: image, timestamp}
      })
    })
  }else {
    // const uploadPhoto = isCameraRoll? selectPhoto : photo
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

  render(){
    const { photo } = this.state;
    return(
      <ViewContainer hideTabBar>
        <View style={styles.contents}>
          {photo !== null
            &&
            <Image key={"first"} style={styles.bigPhoto} source={{uri: "data:image/jpeg;base64," + photo}} />
          }
        </View>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <Text style={styles.formKey}>
              Title
            </Text>
            <TextInput
              style={styles.container}
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              />
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formKey}>
              Time
            </Text>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1960-01-01"
              maxDate="2020-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>
        </View>
        <TouchableHighlight style={styles.button} onPress={this.postPhoto.bind(this)}>
          <Text style={styles.buttonText}>Post Photo!</Text>
        </TouchableHighlight>
      </ViewContainer>
    );
  }
}
export const PostPhotoScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostPhoto);
