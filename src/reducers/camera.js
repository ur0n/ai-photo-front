import { SET_CAMERA, TAKE_PICTURE_SUCCESS, TAKE_PICTURE_FAILURE, SWITCH_TYPE, SWITCH_FLASH } from '../constants/camera';
import Camera from 'react-native-camera';

const initialState = {
  camera: {
    aspect: Camera.constants.Aspect.fill,
    captureTarget: Camera.constants.CaptureTarget.cameraRoll,
    type: Camera.constants.Type.back,
    orientation: Camera.constants.Orientation.auto,
    flashMode: Camera.constants.FlashMode.auto,
  },
  isRecording: false,
  photo: null,
  error: false
};


export default function cameraReducer(state = initialState, action){
  switch(action.type){
    case TAKE_PICTURE_SUCCESS:
    return {
      ...state,
      photo: action.data
    };
    case TAKE_PICTURE_FAILURE:
    return{
      ...state,
      error: true
    };
    case SWITCH_TYPE:
    return {
      ...state,
      camera: {
        ...state.camera,
        type: action.cameraType
      }
    };
    case SWITCH_FLASH:
    return {
      ...state,
      camera: {
        ...state.camera,
        flashMode: action.flashMode
      }
    }
    default:
    return state;
  }
}
