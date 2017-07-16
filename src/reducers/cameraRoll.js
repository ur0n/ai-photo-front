import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE } from '../constants/cameraRoll';

const initialState = {
  photos: [],
  isFetched: false,
  error: false
};


export default function cameraRollReducer(state = initialState, action){
  switch(action.type){
    case GET_PHOTOS:
    return {
      ...state,
      photos: [],
      isFetched: false
    };
    case GET_PHOTOS_SUCCESS:
    return {
      ...state,
      photos: action.data,
      isFetched: true
    };
    case GET_PHOTOS_FAILURE:
    return{
      ...state,
      error: true,
      isFetched: false
    };
    default:
    return state;
  }
}
