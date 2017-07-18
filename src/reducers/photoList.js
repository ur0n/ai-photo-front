import { FETCH_PHOTO_LIST, FETCH_PHOTO_LSIT_SUCCESS, FETCH_PHOTO_LSIT_FAILURE } from '../constants/photoList';

const initialState = {
  photoList: [],
  isFetched: false,
  error: false
}

export default function photoListReducer(state = initialState, action){
  switch (action.type) {
    case FETCH_PHOTO_LIST:
    return{
      ...state,
      isFetched: false
    };
    break;
    case FETCH_PHOTO_LSIT_SUCCESS:
    return {
      ...state,
      isFetched: true,
      photoList: action.data
    };
    case FETCH_PHOTO_LSIT_FAILURE:
    return {
      ...state,
      isFetched: false,
      error: true
    }
    default:
    return state;
  }
}
