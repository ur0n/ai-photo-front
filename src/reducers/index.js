import { combineReducers } from 'redux';
import people from './people';
import cameraRoll from './cameraRoll';
import postPhoto from './postPhoto';
import photoList from './photoList';

const rootReducer = combineReducers({
    people,
    cameraRoll,
    postPhoto,
    photoList
  });

export default rootReducer;