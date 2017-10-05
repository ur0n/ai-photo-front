import { FETCH_PHOTO_LIST, FETCH_PHOTO_LIST_SUCCESS, FETCH_PHOTO_LIST_FAILURE, SET_PAGE } from '../constants/photoList';

const initialState = {
  page: 1,
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
    case SET_PAGE:
    return {
      ...state,
      page: action.page
    }
    break;
    case FETCH_PHOTO_LIST_SUCCESS:
    return {
      ...state,
      isFetched: true,
      // photoList: action.data
      photoList: [
        ...action.data.Photos,
        ...state.photoList
      ]
    };
    break;
    case FETCH_PHOTO_LIST_FAILURE:
    return {
      ...state,
      isFetched: false,
      error: true
    }
    break;
    default:
    return state;
  }
}
