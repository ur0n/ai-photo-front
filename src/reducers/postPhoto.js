import { POST_PHOTO, POST_PHOTO_SUCCESS, POST_PHOTO_FAILURE } from '../constants/postPhoto';

const initialState = {
  response: null,
  error: false
}

export default function postPhotoReducer(state = initialState, action){
  switch (action.type) {
    case POST_PHOTO:
    return {
      ...state
    };
    break;
    case POST_PHOTO_SUCCESS:
    return {
      ...state,
      response: action.data
    }
    case POST_PHOTO_FAILURE:
    return {
      ...state,
      error: action.err
    }
    default:
    return state;
  }
}
