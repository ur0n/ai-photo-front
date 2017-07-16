import { combineReducers } from 'redux';
import people from './people';
import cameraRoll from './cameraRoll';

const rootReducer = combineReducers({
    people,
    cameraRoll
  });

export default rootReducer;
