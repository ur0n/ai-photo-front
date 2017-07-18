import { combineReducers } from 'redux';
import people from './people';
import cameraRoll from './cameraRoll';
import postPhoto from './postPhoto';

const rootReducer = combineReducers({
    people,
    cameraRoll,
    postPhoto
  });

export default rootReducer;
