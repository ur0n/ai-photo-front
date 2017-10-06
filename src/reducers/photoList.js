import { FETCH_PHOTO_LIST, FETCH_PHOTO_LIST_SUCCESS, FETCH_PHOTO_LIST_FAILURE, SET_PAGE, UPDATE_PHOTO_LIST_SUCCESS } from '../constants/photoList';

const initialState = {
  page: 1,
  photoList: [],
  isFetched: false,
  error: false
}

function dedupe(array, item, mode) {
  //重複データが入らないようにするための対応
  const res = item.filter(element1 =>
    array.filter(element2 =>
      element1.id === element2.id).length === 0)

  console.log("---------------------------------------");
  console.log(res.length);
  console.log("---------------------------------------");
  return res;
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
    case FETCH_PHOTO_LIST_SUCCESS: {
      const res = dedupe(state.photoList, action.data.Photos)
      const photoList = res.length === 0? [...state.photoList] : [...state.photoList, ...res]
      return {
        ...state,
        isFetched: true,
        photoList: photoList
      };
    }
    break;
    case FETCH_PHOTO_LIST_FAILURE:
    return {
      ...state,
      isFetched: false,
      error: true
    }
    break;
    case UPDATE_PHOTO_LIST_SUCCESS: {
      const res = dedupe(state.photoList, action.data.Photos)
      const photoList = res.length === 0? [...state.photoList] : [...res, ...state.photoList]
      return {
        ...state,
        isFetched: true,
        photoList: photoList
      };
    }
    break;
    default:
    return state;
  }
}
