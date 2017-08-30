import { SET_CAMERA, TAKE_PICTURE_SUCCESS, TAKE_PICTURE_FAILURE, SWITCH_TYPE, SWITCH_FLASH } from '../constants/camera';
import Camera from 'react-native-camera';

const initialState = {
  camera: {
    aspect: Camera.constants.Aspect.fill,
    captureTarget: Camera.constants.CaptureTarget.temp,
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
    break;
    case TAKE_PICTURE_FAILURE:
    return{
      ...state,
      error: true
    };
    break;
    case SWITCH_TYPE:
    return {
      ...state,
      camera: {
        ...state.camera,
        type: action.cameraType
      }
    };
    break;
    case SWITCH_FLASH:
    return {
      ...state,
      camera: {
        ...state.camera,
        flashMode: action.flashMode
      }
    }
    break;
    default:
    return state;
  }
}
