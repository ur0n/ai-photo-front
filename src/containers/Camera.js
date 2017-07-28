import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';

import { takePicture, switchCameraType, switchFlashMode } from '../actions/camera';

class Camera1 extends Component {
  constructor(props) {
    super(props);

    this.camera = null;
  }

  get typeIcon() {
    const { back, front } = Camera.constants.Type;

    return this.props.camera.type === back ?
    require('../../assets/ic_camera_rear_white.png') : require('../../assets/ic_camera_front_white.png');
  }

  get flashIcon() {
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.props.camera.flashMode === auto) {
      return require('../../assets/ic_flash_auto_white.png');
    } else if (this.props.camera.flashMode === on) {
      return require('../../assets/ic_flash_on_white.png');
    } else if (this.props.camera.flashMode === off) {
      return require('../../assets/ic_flash_off_white.png');
    }
  }

  render() {
    const { camera, photo, isRecording } = this.props.camera;
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={camera.aspect}
          captureTarget={camera.captureTarget}
          type={camera.type}
          flashMode={camera.flashMode}
          onFocusChanged={() => {}}
          onZoomChanged={() => {}}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={() => this.props.switchType(camera.type)}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={() => this.props.switchFlash(camera.flashMode)}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          {
            !isRecording
            &&
            <TouchableOpacity
              style={styles.captureButton}
              onPress={() => this.props.takePicture(this.camera)}
              >
              <Image
                source={require('../../assets/ic_photo_camera_36pt.png')}
                />
            </TouchableOpacity>
            ||
            null
          }
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

function mapStateToProps(state) {
  return {
    camera: state.camera
  };
}

function mapDispatchToProps(dispatch) {
  return {
    takePicture: camera => dispatch(takePicture(camera)),
    switchType: cameraType => dispatch(switchCameraType(cameraType)),
    switchFlash: flashMode => dispatch(switchFlashMode(flashMode))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Camera1);
