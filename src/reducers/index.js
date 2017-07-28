import { combineReducers } from 'redux';
import people from './people';
import cameraRoll from './cameraRoll';
import postPhoto from './postPhoto';
import photoList from './photoList';
import camera from './camera';

const rootReducer = combineReducers({
    people,
    cameraRoll,
    postPhoto,
    photoList,
    camera
  });

export default rootReducer;
