import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAILURE, SELECT_PHOTO } from '../constants/cameraRoll';

const initialState = {
  photos: [],
  selectPhoto: null,
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
      selectPhoto: action.data[0],
      isFetched: true
    };
    case GET_PHOTOS_FAILURE:
    return{
      ...state,
      error: true,
      isFetched: false
    };
    case SELECT_PHOTO:
    return {
      ...state,
      selectPhoto: action.data
    }
    default:
    return state;
  }
}
