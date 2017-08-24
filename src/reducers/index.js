import { combineReducers } from 'redux';
import cameraRoll from './cameraRoll';
import postPhoto from './postPhoto';
import photoList from './photoList';
import camera from './camera';
import season from './season';

const rootReducer = combineReducers({
    cameraRoll,
    postPhoto,
    photoList,
    season,
    camera
  });

export default rootReducer;
